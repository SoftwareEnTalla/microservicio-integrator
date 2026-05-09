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
import { Integrator } from "../entities/integrator.entity";
import { CreateIntegratorDto, UpdateIntegratorDto, DeleteIntegratorDto } from "../dtos/all-dto";
 
import { generateCacheKey } from "src/utils/functions";
import { IntegratorCommandRepository } from "../repositories/integratorcommand.repository";
import { IntegratorQueryRepository } from "../repositories/integratorquery.repository";
import { Cacheable } from "../decorators/cache.decorator";
import { IntegratorResponse, IntegratorsResponse } from "../types/integrator.types";
import { Helper } from "src/common/helpers/helpers";
//Logger
import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { LoggerClient } from "src/common/logger/logger.client";
import { logger } from '@core/logs/logger';

import { CommandBus } from "@nestjs/cqrs";
import { EventStoreService } from "../shared/event-store/event-store.service";
import { KafkaEventPublisher } from "../shared/adapters/kafka-event-publisher";
import { ModuleRef } from "@nestjs/core";
import { IntegratorQueryService } from "./integratorquery.service";
import { BaseEvent } from "../events/base.event";
import { IntegratorConfiguredEvent } from '../events/integratorconfigured.event';
import { IntegratorActivatedEvent } from '../events/integratoractivated.event';
import { IntegratorDegradedEvent } from '../events/integratordegraded.event';
import { IntegratorSuspendedEvent } from '../events/integratorsuspended.event';
import { IntegratorRevokedEvent } from '../events/integratorrevoked.event';

@Injectable()
export class IntegratorCommandService implements OnModuleInit {
  // Private properties
  readonly #logger = new Logger(IntegratorCommandService.name);
  //Constructo del servicio IntegratorCommandService
  constructor(
    private readonly repository: IntegratorCommandRepository,
    private readonly queryRepository: IntegratorQueryRepository,
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
      .registerClient(IntegratorQueryService.name)
      .get(IntegratorQueryService.name),
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
        await this.eventStore.appendEvent('integrator-' + event.aggregateId, event);
      }
    }
  }

  private async applyDslServiceRules(
    operation: "create" | "update" | "delete",
    inputData: Record<string, any>,
    entity?: Integrator | null,
    current?: Integrator | null,
    publishEvents: boolean = true,
  ): Promise<void> {
    const entityData = ((entity ?? {}) as Record<string, any>);
    const currentData = ((current ?? {}) as Record<string, any>);
    const pendingEvents: BaseEvent[] = [];
    if (operation === 'create') {
      // Regla de servicio: active-integrator-requires-credential-and-endpoint
      // Una integración activa requiere endpoint principal y alias de credencial.
      if (!((!(this.dslValue(entityData, currentData, inputData, 'status') === 'ACTIVE') || (!(this.dslValue(entityData, currentData, inputData, 'credentialAlias') === undefined || this.dslValue(entityData, currentData, inputData, 'credentialAlias') === null || (typeof this.dslValue(entityData, currentData, inputData, 'credentialAlias') === 'string' && String(this.dslValue(entityData, currentData, inputData, 'credentialAlias')).trim() === '') || (Array.isArray(this.dslValue(entityData, currentData, inputData, 'credentialAlias')) && this.dslValue(entityData, currentData, inputData, 'credentialAlias').length === 0) || (typeof this.dslValue(entityData, currentData, inputData, 'credentialAlias') === 'object' && !Array.isArray(this.dslValue(entityData, currentData, inputData, 'credentialAlias')) && Object.prototype.toString.call(this.dslValue(entityData, currentData, inputData, 'credentialAlias')) === '[object Object]' && Object.keys(Object(this.dslValue(entityData, currentData, inputData, 'credentialAlias'))).length === 0)) && !(this.dslValue(entityData, currentData, inputData, 'primaryEndpointId') === undefined || this.dslValue(entityData, currentData, inputData, 'primaryEndpointId') === null || (typeof this.dslValue(entityData, currentData, inputData, 'primaryEndpointId') === 'string' && String(this.dslValue(entityData, currentData, inputData, 'primaryEndpointId')).trim() === '') || (Array.isArray(this.dslValue(entityData, currentData, inputData, 'primaryEndpointId')) && this.dslValue(entityData, currentData, inputData, 'primaryEndpointId').length === 0) || (typeof this.dslValue(entityData, currentData, inputData, 'primaryEndpointId') === 'object' && !Array.isArray(this.dslValue(entityData, currentData, inputData, 'primaryEndpointId')) && Object.prototype.toString.call(this.dslValue(entityData, currentData, inputData, 'primaryEndpointId')) === '[object Object]' && Object.keys(Object(this.dslValue(entityData, currentData, inputData, 'primaryEndpointId'))).length === 0)))))) {
        throw new Error('INTEGRATOR_001: Una integración ACTIVE requiere endpoint principal y alias de credencial');
      }

    }

    if (operation === 'update') {
      // Regla de servicio: active-integrator-requires-credential-and-endpoint
      // Una integración activa requiere endpoint principal y alias de credencial.
      if (!((!(this.dslValue(entityData, currentData, inputData, 'status') === 'ACTIVE') || (!(this.dslValue(entityData, currentData, inputData, 'credentialAlias') === undefined || this.dslValue(entityData, currentData, inputData, 'credentialAlias') === null || (typeof this.dslValue(entityData, currentData, inputData, 'credentialAlias') === 'string' && String(this.dslValue(entityData, currentData, inputData, 'credentialAlias')).trim() === '') || (Array.isArray(this.dslValue(entityData, currentData, inputData, 'credentialAlias')) && this.dslValue(entityData, currentData, inputData, 'credentialAlias').length === 0) || (typeof this.dslValue(entityData, currentData, inputData, 'credentialAlias') === 'object' && !Array.isArray(this.dslValue(entityData, currentData, inputData, 'credentialAlias')) && Object.prototype.toString.call(this.dslValue(entityData, currentData, inputData, 'credentialAlias')) === '[object Object]' && Object.keys(Object(this.dslValue(entityData, currentData, inputData, 'credentialAlias'))).length === 0)) && !(this.dslValue(entityData, currentData, inputData, 'primaryEndpointId') === undefined || this.dslValue(entityData, currentData, inputData, 'primaryEndpointId') === null || (typeof this.dslValue(entityData, currentData, inputData, 'primaryEndpointId') === 'string' && String(this.dslValue(entityData, currentData, inputData, 'primaryEndpointId')).trim() === '') || (Array.isArray(this.dslValue(entityData, currentData, inputData, 'primaryEndpointId')) && this.dslValue(entityData, currentData, inputData, 'primaryEndpointId').length === 0) || (typeof this.dslValue(entityData, currentData, inputData, 'primaryEndpointId') === 'object' && !Array.isArray(this.dslValue(entityData, currentData, inputData, 'primaryEndpointId')) && Object.prototype.toString.call(this.dslValue(entityData, currentData, inputData, 'primaryEndpointId')) === '[object Object]' && Object.keys(Object(this.dslValue(entityData, currentData, inputData, 'primaryEndpointId'))).length === 0)))))) {
        throw new Error('INTEGRATOR_001: Una integración ACTIVE requiere endpoint principal y alias de credencial');
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
      .registerClient(IntegratorCommandService.name)
      .get(IntegratorCommandService.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<CreateIntegratorDto>("createIntegrator", args[0], args[1]),
    ttl: 60,
  })
  async create(
    createIntegratorDtoInput: CreateIntegratorDto
  ): Promise<IntegratorResponse<Integrator>> {
    try {
      logger.info("Receiving in service:", createIntegratorDtoInput);
      const candidate = Integrator.fromDto(createIntegratorDtoInput);
      await this.applyDslServiceRules("create", createIntegratorDtoInput as Record<string, any>, candidate, null, false);
      const entity = await this.repository.create(candidate);
      await this.applyDslServiceRules("create", createIntegratorDtoInput as Record<string, any>, entity, null, true);
      logger.info("Entity created on service:", entity);
      // Respuesta si el integrator no existe
      if (!entity)
        throw new NotFoundException("Entidad Integrator no encontrada.");
      // Devolver integrator
      return {
        ok: true,
        message: "Integrator obtenido con éxito.",
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
      .registerClient(IntegratorCommandService.name)
      .get(IntegratorCommandService.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<Integrator>("createIntegrators", args[0], args[1]),
    ttl: 60,
  })
  async bulkCreate(
    createIntegratorDtosInput: CreateIntegratorDto[]
  ): Promise<IntegratorsResponse<Integrator>> {
    try {
      const entities = await this.repository.bulkCreate(
        createIntegratorDtosInput.map((entity) => Integrator.fromDto(entity))
      );

      // Respuesta si el integrator no existe
      if (!entities)
        throw new NotFoundException("Entidades Integrators no encontradas.");
      // Devolver integrator
      return {
        ok: true,
        message: "Integrators creados con éxito.",
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
      .registerClient(IntegratorCommandService.name)
      .get(IntegratorCommandService.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<UpdateIntegratorDto>("updateIntegrator", args[0], args[1]),
    ttl: 60,
  })
  async update(
    id: string,
    partialEntity: UpdateIntegratorDto
  ): Promise<IntegratorResponse<Integrator>> {
    try {
      const currentEntity = await this.queryRepository.findById(id);
      const candidate = Object.assign(new Integrator(), currentEntity ?? {}, partialEntity);
      await this.applyDslServiceRules("update", partialEntity as Record<string, any>, candidate, currentEntity, false);
      const entity = await this.repository.update(
        id,
        candidate
      );
      await this.applyDslServiceRules("update", partialEntity as Record<string, any>, entity, currentEntity, true);
      // Respuesta si el integrator no existe
      if (!entity)
        throw new NotFoundException("Entidades Integrators no encontradas.");
      // Devolver integrator
      return {
        ok: true,
        message: "Integrator actualizada con éxito.",
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
      .registerClient(IntegratorCommandService.name)
      .get(IntegratorCommandService.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<UpdateIntegratorDto>("updateIntegrators", args[0]),
    ttl: 60,
  })
  async bulkUpdate(
    partialEntity: UpdateIntegratorDto[]
  ): Promise<IntegratorsResponse<Integrator>> {
    try {
      const entities = await this.repository.bulkUpdate(
        partialEntity.map((entity) => Integrator.fromDto(entity))
      );
      // Respuesta si el integrator no existe
      if (!entities)
        throw new NotFoundException("Entidades Integrators no encontradas.");
      // Devolver integrator
      return {
        ok: true,
        message: "Integrators actualizadas con éxito.",
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
      .registerClient(IntegratorCommandService.name)
      .get(IntegratorCommandService.name),
  })
  @Cacheable({
    key: (args) =>
      generateCacheKey<DeleteIntegratorDto>("deleteIntegrator", args[0], args[1]),
    ttl: 60,
  })
  async delete(id: string): Promise<IntegratorResponse<Integrator>> {
    try {
      const entity = await this.queryRepository.findById(id);
      // Respuesta si el integrator no existe
      if (!entity)
        throw new NotFoundException("Instancias de Integrator no encontradas.");

      await this.applyDslServiceRules("delete", { id }, entity, entity, false);

      const result = await this.repository.delete(id);
      await this.applyDslServiceRules("delete", { id }, entity, entity, true);
      // Devolver integrator
      return {
        ok: true,
        message: "Instancia de Integrator eliminada con éxito.",
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
      .registerClient(IntegratorCommandService.name)
      .get(IntegratorCommandService.name),
  })
  @Cacheable({
    key: (args) => generateCacheKey<string[]>("deleteIntegrators", args[0]),
    ttl: 60,
  })
  async bulkDelete(ids: string[]): Promise<DeleteResult> {
    return await this.repository.bulkDelete(ids);
  }
}

