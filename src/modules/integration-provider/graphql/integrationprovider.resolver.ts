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
import { IntegrationProvider } from "../entities/integration-provider.entity";

//Definición de comandos
import {
  CreateIntegrationProviderCommand,
  UpdateIntegrationProviderCommand,
  DeleteIntegrationProviderCommand,
} from "../commands/exporting.command";

import { CommandBus } from "@nestjs/cqrs";
import { IntegrationProviderQueryService } from "../services/integrationproviderquery.service";


import { IntegrationProviderResponse, IntegrationProvidersResponse } from "../types/integrationprovider.types";
import { FindManyOptions } from "typeorm";
import { PaginationArgs } from "src/common/dto/args/pagination.args";
import { fromObject } from "src/utils/functions";

//Logger
import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { LoggerClient } from "src/common/logger/logger.client";
import { logger } from '@core/logs/logger';

import { v4 as uuidv4 } from "uuid";

//Definición de tdos
import { UpdateIntegrationProviderDto, 
CreateOrUpdateIntegrationProviderDto, 
IntegrationProviderValueInput, 
IntegrationProviderDto, 
CreateIntegrationProviderDto } from "../dtos/all-dto";
 

//@UseGuards(JwtGraphQlAuthGuard)
@Resolver(() => IntegrationProvider)
export class IntegrationProviderResolver {

   //Constructor del resolver de IntegrationProvider
  constructor(
    private readonly service: IntegrationProviderQueryService,
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
      .registerClient(IntegrationProviderResolver.name)

      .get(IntegrationProviderResolver.name),
    })
  // Mutaciones
  @Mutation(() => IntegrationProviderResponse<IntegrationProvider>)
  async createIntegrationProvider(
    @Args("input", { type: () => CreateIntegrationProviderDto }) input: CreateIntegrationProviderDto
  ): Promise<IntegrationProviderResponse<IntegrationProvider>> {
    return this.commandBus.execute(new CreateIntegrationProviderCommand(input));
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
      .registerClient(IntegrationProviderResolver.name)

      .get(IntegrationProviderResolver.name),
    })
  @Mutation(() => IntegrationProviderResponse<IntegrationProvider>)
  async updateIntegrationProvider(
    @Args("id", { type: () => String }) id: string,
    @Args("input") input: UpdateIntegrationProviderDto
  ): Promise<IntegrationProviderResponse<IntegrationProvider>> {
    const payLoad = input;
    return this.commandBus.execute(
      new UpdateIntegrationProviderCommand(payLoad, {
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
      .registerClient(IntegrationProviderResolver.name)

      .get(IntegrationProviderResolver.name),
    })
  @Mutation(() => IntegrationProviderResponse<IntegrationProvider>)
  async createOrUpdateIntegrationProvider(
    @Args("data", { type: () => CreateOrUpdateIntegrationProviderDto })
    data: CreateOrUpdateIntegrationProviderDto
  ): Promise<IntegrationProviderResponse<IntegrationProvider>> {
    if (data.id) {
      const existingIntegrationProvider = await this.service.findById(data.id);
      if (existingIntegrationProvider) {
        return this.commandBus.execute(
          new UpdateIntegrationProviderCommand(data, {
            instance: data,
            metadata: {
              initiatedBy:
                (data.input as CreateIntegrationProviderDto | UpdateIntegrationProviderDto).createdBy ||
                'system',
              correlationId: data.id,
            },
          })
        );
      }
    }
    return this.commandBus.execute(
      new CreateIntegrationProviderCommand(data, {
        instance: data,
        metadata: {
          initiatedBy:
            (data.input as CreateIntegrationProviderDto | UpdateIntegrationProviderDto).createdBy ||
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
      .registerClient(IntegrationProviderResolver.name)

      .get(IntegrationProviderResolver.name),
    })
  @Mutation(() => Boolean)
  async deleteIntegrationProvider(
    @Args("id", { type: () => String }) id: string
  ): Promise<boolean> {
    return this.commandBus.execute(new DeleteIntegrationProviderCommand(id));
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
      .registerClient(IntegrationProviderResolver.name)

      .get(IntegrationProviderResolver.name),
    })
  // Queries
  @Query(() => IntegrationProvidersResponse<IntegrationProvider>)
  async integrationproviders(
    options?: FindManyOptions<IntegrationProvider>,
    paginationArgs?: PaginationArgs
  ): Promise<IntegrationProvidersResponse<IntegrationProvider>> {
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
      .registerClient(IntegrationProviderResolver.name)

      .get(IntegrationProviderResolver.name),
    })
  @Query(() => IntegrationProvidersResponse<IntegrationProvider>)
  async integrationprovider(
    @Args("id", { type: () => String }) id: string
  ): Promise<IntegrationProviderResponse<IntegrationProvider>> {
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
      .registerClient(IntegrationProviderResolver.name)

      .get(IntegrationProviderResolver.name),
    })
  @Query(() => IntegrationProvidersResponse<IntegrationProvider>)
  async integrationprovidersByField(
    @Args("field", { type: () => String }) field: string,
    @Args("value", { type: () => IntegrationProviderValueInput }) value: IntegrationProviderValueInput,
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<IntegrationProvidersResponse<IntegrationProvider>> {
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
      .registerClient(IntegrationProviderResolver.name)

      .get(IntegrationProviderResolver.name),
    })
  @Query(() => IntegrationProvidersResponse<IntegrationProvider>)
  async integrationprovidersWithPagination(
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<IntegrationProvidersResponse<IntegrationProvider>> {
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
      .registerClient(IntegrationProviderResolver.name)

      .get(IntegrationProviderResolver.name),
    })
  @Query(() => Number)
  async totalIntegrationProviders(): Promise<number> {
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
      .registerClient(IntegrationProviderResolver.name)

      .get(IntegrationProviderResolver.name),
    })
  @Query(() => IntegrationProvidersResponse<IntegrationProvider>)
  async searchIntegrationProviders(
    @Args("where", { type: () => IntegrationProviderDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationProvidersResponse<IntegrationProvider>> {
    const integrationproviders = await this.service.findAndCount(where);
    return integrationproviders;
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
      .registerClient(IntegrationProviderResolver.name)

      .get(IntegrationProviderResolver.name),
    })
  @Query(() => IntegrationProviderResponse<IntegrationProvider>, { nullable: true })
  async findOneIntegrationProvider(
    @Args("where", { type: () => IntegrationProviderDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationProviderResponse<IntegrationProvider>> {
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
      .registerClient(IntegrationProviderResolver.name)

      .get(IntegrationProviderResolver.name),
    })
  @Query(() => IntegrationProviderResponse<IntegrationProvider>)
  async findOneIntegrationProviderOrFail(
    @Args("where", { type: () => IntegrationProviderDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationProviderResponse<IntegrationProvider> | Error> {
    return this.service.findOneOrFail(where);
  }
}

