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
import { IntegrationEndpoint } from "../entities/integration-endpoint.entity";

//Definición de comandos
import {
  CreateIntegrationEndpointCommand,
  UpdateIntegrationEndpointCommand,
  DeleteIntegrationEndpointCommand,
} from "../commands/exporting.command";

import { CommandBus } from "@nestjs/cqrs";
import { IntegrationEndpointQueryService } from "../services/integrationendpointquery.service";


import { IntegrationEndpointResponse, IntegrationEndpointsResponse } from "../types/integrationendpoint.types";
import { FindManyOptions } from "typeorm";
import { PaginationArgs } from "src/common/dto/args/pagination.args";
import { fromObject } from "src/utils/functions";

//Logger
import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { LoggerClient } from "src/common/logger/logger.client";
import { logger } from '@core/logs/logger';

import { v4 as uuidv4 } from "uuid";

//Definición de tdos
import { UpdateIntegrationEndpointDto, 
CreateOrUpdateIntegrationEndpointDto, 
IntegrationEndpointValueInput, 
IntegrationEndpointDto, 
CreateIntegrationEndpointDto } from "../dtos/all-dto";
 

//@UseGuards(JwtGraphQlAuthGuard)
@Resolver(() => IntegrationEndpoint)
export class IntegrationEndpointResolver {

   //Constructor del resolver de IntegrationEndpoint
  constructor(
    private readonly service: IntegrationEndpointQueryService,
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
      .registerClient(IntegrationEndpointResolver.name)

      .get(IntegrationEndpointResolver.name),
    })
  // Mutaciones
  @Mutation(() => IntegrationEndpointResponse<IntegrationEndpoint>)
  async createIntegrationEndpoint(
    @Args("input", { type: () => CreateIntegrationEndpointDto }) input: CreateIntegrationEndpointDto
  ): Promise<IntegrationEndpointResponse<IntegrationEndpoint>> {
    return this.commandBus.execute(new CreateIntegrationEndpointCommand(input));
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
      .registerClient(IntegrationEndpointResolver.name)

      .get(IntegrationEndpointResolver.name),
    })
  @Mutation(() => IntegrationEndpointResponse<IntegrationEndpoint>)
  async updateIntegrationEndpoint(
    @Args("id", { type: () => String }) id: string,
    @Args("input") input: UpdateIntegrationEndpointDto
  ): Promise<IntegrationEndpointResponse<IntegrationEndpoint>> {
    const payLoad = input;
    return this.commandBus.execute(
      new UpdateIntegrationEndpointCommand(payLoad, {
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
      .registerClient(IntegrationEndpointResolver.name)

      .get(IntegrationEndpointResolver.name),
    })
  @Mutation(() => IntegrationEndpointResponse<IntegrationEndpoint>)
  async createOrUpdateIntegrationEndpoint(
    @Args("data", { type: () => CreateOrUpdateIntegrationEndpointDto })
    data: CreateOrUpdateIntegrationEndpointDto
  ): Promise<IntegrationEndpointResponse<IntegrationEndpoint>> {
    if (data.id) {
      const existingIntegrationEndpoint = await this.service.findById(data.id);
      if (existingIntegrationEndpoint) {
        return this.commandBus.execute(
          new UpdateIntegrationEndpointCommand(data, {
            instance: data,
            metadata: {
              initiatedBy:
                (data.input as CreateIntegrationEndpointDto | UpdateIntegrationEndpointDto).createdBy ||
                'system',
              correlationId: data.id,
            },
          })
        );
      }
    }
    return this.commandBus.execute(
      new CreateIntegrationEndpointCommand(data, {
        instance: data,
        metadata: {
          initiatedBy:
            (data.input as CreateIntegrationEndpointDto | UpdateIntegrationEndpointDto).createdBy ||
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
      .registerClient(IntegrationEndpointResolver.name)

      .get(IntegrationEndpointResolver.name),
    })
  @Mutation(() => Boolean)
  async deleteIntegrationEndpoint(
    @Args("id", { type: () => String }) id: string
  ): Promise<boolean> {
    return this.commandBus.execute(new DeleteIntegrationEndpointCommand(id));
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
      .registerClient(IntegrationEndpointResolver.name)

      .get(IntegrationEndpointResolver.name),
    })
  // Queries
  @Query(() => IntegrationEndpointsResponse<IntegrationEndpoint>)
  async integrationendpoints(
    options?: FindManyOptions<IntegrationEndpoint>,
    paginationArgs?: PaginationArgs
  ): Promise<IntegrationEndpointsResponse<IntegrationEndpoint>> {
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
      .registerClient(IntegrationEndpointResolver.name)

      .get(IntegrationEndpointResolver.name),
    })
  @Query(() => IntegrationEndpointsResponse<IntegrationEndpoint>)
  async integrationendpoint(
    @Args("id", { type: () => String }) id: string
  ): Promise<IntegrationEndpointResponse<IntegrationEndpoint>> {
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
      .registerClient(IntegrationEndpointResolver.name)

      .get(IntegrationEndpointResolver.name),
    })
  @Query(() => IntegrationEndpointsResponse<IntegrationEndpoint>)
  async integrationendpointsByField(
    @Args("field", { type: () => String }) field: string,
    @Args("value", { type: () => IntegrationEndpointValueInput }) value: IntegrationEndpointValueInput,
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<IntegrationEndpointsResponse<IntegrationEndpoint>> {
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
      .registerClient(IntegrationEndpointResolver.name)

      .get(IntegrationEndpointResolver.name),
    })
  @Query(() => IntegrationEndpointsResponse<IntegrationEndpoint>)
  async integrationendpointsWithPagination(
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<IntegrationEndpointsResponse<IntegrationEndpoint>> {
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
      .registerClient(IntegrationEndpointResolver.name)

      .get(IntegrationEndpointResolver.name),
    })
  @Query(() => Number)
  async totalIntegrationEndpoints(): Promise<number> {
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
      .registerClient(IntegrationEndpointResolver.name)

      .get(IntegrationEndpointResolver.name),
    })
  @Query(() => IntegrationEndpointsResponse<IntegrationEndpoint>)
  async searchIntegrationEndpoints(
    @Args("where", { type: () => IntegrationEndpointDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationEndpointsResponse<IntegrationEndpoint>> {
    const integrationendpoints = await this.service.findAndCount(where);
    return integrationendpoints;
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
      .registerClient(IntegrationEndpointResolver.name)

      .get(IntegrationEndpointResolver.name),
    })
  @Query(() => IntegrationEndpointResponse<IntegrationEndpoint>, { nullable: true })
  async findOneIntegrationEndpoint(
    @Args("where", { type: () => IntegrationEndpointDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationEndpointResponse<IntegrationEndpoint>> {
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
      .registerClient(IntegrationEndpointResolver.name)

      .get(IntegrationEndpointResolver.name),
    })
  @Query(() => IntegrationEndpointResponse<IntegrationEndpoint>)
  async findOneIntegrationEndpointOrFail(
    @Args("where", { type: () => IntegrationEndpointDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationEndpointResponse<IntegrationEndpoint> | Error> {
    return this.service.findOneOrFail(where);
  }
}

