/*
 * Copyright (c) 2026 SoftwarEnTalla
 * Licencia: MIT
 * Contacto: softwarentalla@gmail.com
 * CEOs: 
 *       Persy Morell Guerra      Email: pmorellpersi@gmail.com  Phone : +53-5336-4654 Linkedin: https://www.linkedin.com/in/persy-morell-guerra-288943357/
 *       Dailyn García Domínguez  Email: dailyngd@gmail.com      Phone : +53-5432-0312 Linkedin: https://www.linkedin.com/in/dailyn-dominguez-3150799b/
 *
 * CTO: Persy Morell Guerra
 * COO: Dailyn García Domínguez and Persy Morell Guerra
 * CFO: Dailyn García Domínguez and Persy Morell Guerra
 *
 * Repositories: 
 *               https://github.com/SoftwareEnTalla 
 *
 *               https://github.com/apokaliptolesamale?tab=repositories
 *
 *
 * Social Networks:
 *
 *              https://x.com/SoftwarEnTalla
 *
 *              https://www.facebook.com/profile.php?id=61572625716568
 *
 *              https://www.instagram.com/softwarentalla/
 *              
 *
 *
 */


import { Injectable, Logger, NotFoundException, OnModuleInit } from "@nestjs/common";
import { DeleteResult, UpdateResult } from "typeorm";
import { IntegrationCredential } from "../entities/integration-credential.entity";
import { CreateIntegrationCredentialDto, UpdateIntegrationCredentialDto, DeleteIntegrationCredentialDto } from "../dtos/all-dto";
 
import { generateCacheKey } from "src/utils/functions";
import { IntegrationCredentialCommandRepository } from "../repositories/integrationcredentialcommand.repository";
import { IntegrationCredentialQueryRepository } from "../repositories/integrationcredentialquery.repository";
import { Cacheable } from "../decorators/cache.decorator";
import { IntegrationCredentialResponse, IntegrationCredentialsResponse } from "../types/integrationcredential.types";
import { Helper } from "src/common/helpers/helpers";
//Logger
import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { LoggerClient } from "src/common/logger/logger.client";
import { logger } from '@core/logs/logger';

import { CommandBus } from "@nestjs/cqrs";
import { EventStoreService } from "../shared/event-store/event-store.service";
import { KafkaEventPublisher } from "../shared/adapters/kafka-event-publisher";
import { ModuleRef } from "@nestjs/core";
import { IntegrationCredentialQueryService } from "./integrationcredentialquery.service";
import { BaseEvent } from "../events/base.event";


@Injectable()
export class IntegrationCredentialCommandService implements OnModuleInit {
  // Private properties
  readonly #logger = new Logger(IntegrationCredentialCommandService.name);
  //Constructo del servicio IntegrationCredentialCommandService
  constructor(
    private readonly repository: IntegrationCredentialCommandRepository,
    private readonly queryRepository: IntegrationCredentialQueryRepository,
    private readonly commandBus: CommandBus,
    private readonly eventStore: EventStoreService,
    private readonly eventPublisher: KafkaEventPublisher,
    private moduleRef: ModuleRef
  ) {
    //Inicialice aquí propiedades o atributos
  }


  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(IntegrationCredentialQueryService.name)
      .get(IntegrationCredentialQueryService.name),
  })
  onModuleInit() {
    //Se ejecuta en la inicialización del módulo
  }

  private dslValue(entityData: Record<string, any>, currentData: Record<string, any>, inputData: Record<string, any>, field: string): any {
    return entityData?.[field] ?? currentData?.[field] ?? inputData?.[field];
  }

  private async publishDslDomainEvents(events: BaseEvent[]): Promise<void> {
    for (const event of events) {
      await this.eventPublisher.publish(event as any);
      if (process.env.EVENT_STORE_ENABLED === "true") {
        await this.eventStore.appendEvent('integration-credential-' + event.aggregateId, event);
      }
    }
  }

  private async applyDslServiceRules(
    operation: "create" | "update" | "delete",
    inputData: Record<string, any>,
    entity?: IntegrationCredential | null,
    current?: IntegrationCredential | null,
    publishEvents: boolean = true,
  ): Promise<void> {
    const entityData = ((entity ?? {}) as Record<string, any>);
    const currentData = ((current ?? {}) as Record<string, any>);
    const pendingEvents: BaseEvent[] = [];
    if (operation === 'create') {
      // Regla de servicio: active-credential-requires-secret-material
      // Una credencial activa debe tener al menos un material secreto utilizable.
      if (!(this.dslValue(entityData, currentData, inputData, 'status') === 'ACTIVE')) {
        throw new Error('INTEGRATION_CREDENTIAL_001: Una credencial ACTIVE requiere apiKey, clientSecret, accessToken o webhookSecret');
      }

    }

    if (operation === 'update') {
      // Regla de servicio: active-credential-requires-secret-material
      // Una credencial activa debe tener al menos un material secreto utilizable.
      if (!(this.dslValue(entityData, currentData, inputData, 'status') === 'ACTIVE')) {
        throw new Error('INTEGRATION_CREDENTIAL_001: Una credencial ACTIVE requiere apiKey, clientSecret, accessToken o webhookSecret');
      }

    }
    if (publishEvents) {
      await this.publishDslDomainEvents(pendingEvents);
    }
  }

  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(IntegrationCredentialCommandService.name)
      .get(IntegrationCredentialCommandService.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<CreateIntegrationCredentialDto>("createIntegrationCredential", args[0], args[1]),
    ttl: 60,
  })
  async create(
    createIntegrationCredentialDtoInput: CreateIntegrationCredentialDto
  ): Promise<IntegrationCredentialResponse<IntegrationCredential>> {
    try {
      logger.info("Receiving in service:", createIntegrationCredentialDtoInput);
      const candidate = IntegrationCredential.fromDto(createIntegrationCredentialDtoInput);
      await this.applyDslServiceRules("create", createIntegrationCredentialDtoInput as Record<string, any>, candidate, null, false);
      const entity = await this.repository.create(candidate);
      await this.applyDslServiceRules("create", createIntegrationCredentialDtoInput as Record<string, any>, entity, null, true);
      logger.info("Entity created on service:", entity);
      // Respuesta si el integrationcredential no existe
      if (!entity)
        throw new NotFoundException("Entidad IntegrationCredential no encontrada.");
      // Devolver integrationcredential
      return {
        ok: true,
        message: "IntegrationCredential obtenido con éxito.",
        data: entity,
      };
    } catch (error) {
      logger.info("Error creating entity on service:", error);
      // Imprimir error
      logger.error(error);
      // Lanzar error
      return Helper.throwCachedError(error);
    }
  }


  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(IntegrationCredentialCommandService.name)
      .get(IntegrationCredentialCommandService.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<IntegrationCredential>("createIntegrationCredentials", args[0], args[1]),
    ttl: 60,
  })
  async bulkCreate(
    createIntegrationCredentialDtosInput: CreateIntegrationCredentialDto[]
  ): Promise<IntegrationCredentialsResponse<IntegrationCredential>> {
    try {
      const entities = await this.repository.bulkCreate(
        createIntegrationCredentialDtosInput.map((entity) => IntegrationCredential.fromDto(entity))
      );

      // Respuesta si el integrationcredential no existe
      if (!entities)
        throw new NotFoundException("Entidades IntegrationCredentials no encontradas.");
      // Devolver integrationcredential
      return {
        ok: true,
        message: "IntegrationCredentials creados con éxito.",
        data: entities,
        count: entities.length,
      };
    } catch (error) {
      // Imprimir error
      logger.error(error);
      // Lanzar error
      return Helper.throwCachedError(error);
    }
  }


  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(IntegrationCredentialCommandService.name)
      .get(IntegrationCredentialCommandService.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<UpdateIntegrationCredentialDto>("updateIntegrationCredential", args[0], args[1]),
    ttl: 60,
  })
  async update(
    id: string,
    partialEntity: UpdateIntegrationCredentialDto
  ): Promise<IntegrationCredentialResponse<IntegrationCredential>> {
    try {
      const currentEntity = await this.queryRepository.findById(id);
      const candidate = Object.assign(new IntegrationCredential(), currentEntity ?? {}, partialEntity);
      await this.applyDslServiceRules("update", partialEntity as Record<string, any>, candidate, currentEntity, false);
      const entity = await this.repository.update(
        id,
        candidate
      );
      await this.applyDslServiceRules("update", partialEntity as Record<string, any>, entity, currentEntity, true);
      // Respuesta si el integrationcredential no existe
      if (!entity)
        throw new NotFoundException("Entidades IntegrationCredentials no encontradas.");
      // Devolver integrationcredential
      return {
        ok: true,
        message: "IntegrationCredential actualizada con éxito.",
        data: entity,
      };
    } catch (error) {
      // Imprimir error
      logger.error(error);
      // Lanzar error
      return Helper.throwCachedError(error);
    }
  }


  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(IntegrationCredentialCommandService.name)
      .get(IntegrationCredentialCommandService.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<UpdateIntegrationCredentialDto>("updateIntegrationCredentials", args[0]),
    ttl: 60,
  })
  async bulkUpdate(
    partialEntity: UpdateIntegrationCredentialDto[]
  ): Promise<IntegrationCredentialsResponse<IntegrationCredential>> {
    try {
      const entities = await this.repository.bulkUpdate(
        partialEntity.map((entity) => IntegrationCredential.fromDto(entity))
      );
      // Respuesta si el integrationcredential no existe
      if (!entities)
        throw new NotFoundException("Entidades IntegrationCredentials no encontradas.");
      // Devolver integrationcredential
      return {
        ok: true,
        message: "IntegrationCredentials actualizadas con éxito.",
        data: entities,
        count: entities.length,
      };
    } catch (error) {
      // Imprimir error
      logger.error(error);
      // Lanzar error
      return Helper.throwCachedError(error);
    }
  }

   @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(IntegrationCredentialCommandService.name)
      .get(IntegrationCredentialCommandService.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<DeleteIntegrationCredentialDto>("deleteIntegrationCredential", args[0], args[1]),
    ttl: 60,
  })
  async delete(id: string): Promise<IntegrationCredentialResponse<IntegrationCredential>> {
    try {
      const entity = await this.queryRepository.findById(id);
      // Respuesta si el integrationcredential no existe
      if (!entity)
        throw new NotFoundException("Instancias de IntegrationCredential no encontradas.");

      await this.applyDslServiceRules("delete", { id }, entity, entity, false);

      const result = await this.repository.delete(id);
      await this.applyDslServiceRules("delete", { id }, entity, entity, true);
      // Devolver integrationcredential
      return {
        ok: true,
        message: "Instancia de IntegrationCredential eliminada con éxito.",
        data: entity,
      };
    } catch (error) {
      // Imprimir error
      logger.error(error);
      // Lanzar error
      return Helper.throwCachedError(error);
    }
  }

  @LogExecutionTime({
    layer: "service",
    callback: async (logData, client) => {
      // Puedes usar el cliente proporcionado o ignorarlo y usar otro
      try{
        logger.info('Información del cliente y datos a enviar:',[logData,client]);
        return await client.send(logData);
      }
      catch(error){
        logger.info('Ha ocurrido un error al enviar la traza de log: ', logData);
        logger.info('ERROR-LOG: ', error);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(IntegrationCredentialCommandService.name)
      .get(IntegrationCredentialCommandService.name),
  })
  @Cacheable({
    key: (args) => generateCacheKey<string[]>("deleteIntegrationCredentials", args[0]),
    ttl: 60,
  })
  async bulkDelete(ids: string[]): Promise<DeleteResult> {
    return await this.repository.bulkDelete(ids);
  }
}

