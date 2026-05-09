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


import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

//Definición de entidades
import { IntegrationCredential } from "../entities/integration-credential.entity";

//Definición de comandos
import {
  CreateIntegrationCredentialCommand,
  UpdateIntegrationCredentialCommand,
  DeleteIntegrationCredentialCommand,
} from "../commands/exporting.command";

import { CommandBus } from "@nestjs/cqrs";
import { IntegrationCredentialQueryService } from "../services/integrationcredentialquery.service";


import { IntegrationCredentialResponse, IntegrationCredentialsResponse } from "../types/integrationcredential.types";
import { FindManyOptions } from "typeorm";
import { PaginationArgs } from "src/common/dto/args/pagination.args";
import { fromObject } from "src/utils/functions";

//Logger
import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { LoggerClient } from "src/common/logger/logger.client";
import { logger } from '@core/logs/logger';

import { v4 as uuidv4 } from "uuid";

//Definición de tdos
import { UpdateIntegrationCredentialDto, 
CreateOrUpdateIntegrationCredentialDto, 
IntegrationCredentialValueInput, 
IntegrationCredentialDto, 
CreateIntegrationCredentialDto } from "../dtos/all-dto";
 

//@UseGuards(JwtGraphQlAuthGuard)
@Resolver(() => IntegrationCredential)
export class IntegrationCredentialResolver {

   //Constructor del resolver de IntegrationCredential
  constructor(
    private readonly service: IntegrationCredentialQueryService,
    private readonly commandBus: CommandBus
  ) {}

  @LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(IntegrationCredentialResolver.name)

      .get(IntegrationCredentialResolver.name),
    })
  // Mutaciones
  @Mutation(() => IntegrationCredentialResponse<IntegrationCredential>)
  async createIntegrationCredential(
    @Args("input", { type: () => CreateIntegrationCredentialDto }) input: CreateIntegrationCredentialDto
  ): Promise<IntegrationCredentialResponse<IntegrationCredential>> {
    return this.commandBus.execute(new CreateIntegrationCredentialCommand(input));
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(IntegrationCredentialResolver.name)

      .get(IntegrationCredentialResolver.name),
    })
  @Mutation(() => IntegrationCredentialResponse<IntegrationCredential>)
  async updateIntegrationCredential(
    @Args("id", { type: () => String }) id: string,
    @Args("input") input: UpdateIntegrationCredentialDto
  ): Promise<IntegrationCredentialResponse<IntegrationCredential>> {
    const payLoad = input;
    return this.commandBus.execute(
      new UpdateIntegrationCredentialCommand(payLoad, {
        instance: payLoad,
        metadata: {
          initiatedBy: payLoad.createdBy || 'system',
          correlationId: payLoad.id,
        },
      })
    );
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(IntegrationCredentialResolver.name)

      .get(IntegrationCredentialResolver.name),
    })
  @Mutation(() => IntegrationCredentialResponse<IntegrationCredential>)
  async createOrUpdateIntegrationCredential(
    @Args("data", { type: () => CreateOrUpdateIntegrationCredentialDto })
    data: CreateOrUpdateIntegrationCredentialDto
  ): Promise<IntegrationCredentialResponse<IntegrationCredential>> {
    if (data.id) {
      const existingIntegrationCredential = await this.service.findById(data.id);
      if (existingIntegrationCredential) {
        return this.commandBus.execute(
          new UpdateIntegrationCredentialCommand(data, {
            instance: data,
            metadata: {
              initiatedBy:
                (data.input as CreateIntegrationCredentialDto | UpdateIntegrationCredentialDto).createdBy ||
                'system',
              correlationId: data.id,
            },
          })
        );
      }
    }
    return this.commandBus.execute(
      new CreateIntegrationCredentialCommand(data, {
        instance: data,
        metadata: {
          initiatedBy:
            (data.input as CreateIntegrationCredentialDto | UpdateIntegrationCredentialDto).createdBy ||
            'system',
          correlationId: data.id || uuidv4(),
        },
      })
    );
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(IntegrationCredentialResolver.name)

      .get(IntegrationCredentialResolver.name),
    })
  @Mutation(() => Boolean)
  async deleteIntegrationCredential(
    @Args("id", { type: () => String }) id: string
  ): Promise<boolean> {
    return this.commandBus.execute(new DeleteIntegrationCredentialCommand(id));
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(IntegrationCredentialResolver.name)

      .get(IntegrationCredentialResolver.name),
    })
  // Queries
  @Query(() => IntegrationCredentialsResponse<IntegrationCredential>)
  async integrationcredentials(
    options?: FindManyOptions<IntegrationCredential>,
    paginationArgs?: PaginationArgs
  ): Promise<IntegrationCredentialsResponse<IntegrationCredential>> {
    return this.service.findAll(options, paginationArgs);
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(IntegrationCredentialResolver.name)

      .get(IntegrationCredentialResolver.name),
    })
  @Query(() => IntegrationCredentialsResponse<IntegrationCredential>)
  async integrationcredential(
    @Args("id", { type: () => String }) id: string
  ): Promise<IntegrationCredentialResponse<IntegrationCredential>> {
    return this.service.findById(id);
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(IntegrationCredentialResolver.name)

      .get(IntegrationCredentialResolver.name),
    })
  @Query(() => IntegrationCredentialsResponse<IntegrationCredential>)
  async integrationcredentialsByField(
    @Args("field", { type: () => String }) field: string,
    @Args("value", { type: () => IntegrationCredentialValueInput }) value: IntegrationCredentialValueInput,
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<IntegrationCredentialsResponse<IntegrationCredential>> {
    return this.service.findByField(
      field,
      value,
      fromObject.call(PaginationArgs, { page: page, limit: limit })
    );
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(IntegrationCredentialResolver.name)

      .get(IntegrationCredentialResolver.name),
    })
  @Query(() => IntegrationCredentialsResponse<IntegrationCredential>)
  async integrationcredentialsWithPagination(
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<IntegrationCredentialsResponse<IntegrationCredential>> {
    const paginationArgs = fromObject.call(PaginationArgs, {
      page: page,
      limit: limit,
    });
    return this.service.findWithPagination({}, paginationArgs);
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(IntegrationCredentialResolver.name)

      .get(IntegrationCredentialResolver.name),
    })
  @Query(() => Number)
  async totalIntegrationCredentials(): Promise<number> {
    return this.service.count();
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(IntegrationCredentialResolver.name)

      .get(IntegrationCredentialResolver.name),
    })
  @Query(() => IntegrationCredentialsResponse<IntegrationCredential>)
  async searchIntegrationCredentials(
    @Args("where", { type: () => IntegrationCredentialDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationCredentialsResponse<IntegrationCredential>> {
    const integrationcredentials = await this.service.findAndCount(where);
    return integrationcredentials;
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(IntegrationCredentialResolver.name)

      .get(IntegrationCredentialResolver.name),
    })
  @Query(() => IntegrationCredentialResponse<IntegrationCredential>, { nullable: true })
  async findOneIntegrationCredential(
    @Args("where", { type: () => IntegrationCredentialDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationCredentialResponse<IntegrationCredential>> {
    return this.service.findOne(where);
  }


@LogExecutionTime({
    layer: 'resolver',
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
      .registerClient(IntegrationCredentialResolver.name)

      .get(IntegrationCredentialResolver.name),
    })
  @Query(() => IntegrationCredentialResponse<IntegrationCredential>)
  async findOneIntegrationCredentialOrFail(
    @Args("where", { type: () => IntegrationCredentialDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationCredentialResponse<IntegrationCredential> | Error> {
    return this.service.findOneOrFail(where);
  }
}

