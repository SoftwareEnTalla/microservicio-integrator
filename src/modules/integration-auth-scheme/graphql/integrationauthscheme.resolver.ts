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
import { IntegrationAuthScheme } from "../entities/integration-auth-scheme.entity";

//Definición de comandos
import {
  CreateIntegrationAuthSchemeCommand,
  UpdateIntegrationAuthSchemeCommand,
  DeleteIntegrationAuthSchemeCommand,
} from "../commands/exporting.command";

import { CommandBus } from "@nestjs/cqrs";
import { IntegrationAuthSchemeQueryService } from "../services/integrationauthschemequery.service";


import { IntegrationAuthSchemeResponse, IntegrationAuthSchemesResponse } from "../types/integrationauthscheme.types";
import { FindManyOptions } from "typeorm";
import { PaginationArgs } from "src/common/dto/args/pagination.args";
import { fromObject } from "src/utils/functions";

//Logger
import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { LoggerClient } from "src/common/logger/logger.client";
import { logger } from '@core/logs/logger';

import { v4 as uuidv4 } from "uuid";

//Definición de tdos
import { UpdateIntegrationAuthSchemeDto, 
CreateOrUpdateIntegrationAuthSchemeDto, 
IntegrationAuthSchemeValueInput, 
IntegrationAuthSchemeDto, 
CreateIntegrationAuthSchemeDto } from "../dtos/all-dto";
 

//@UseGuards(JwtGraphQlAuthGuard)
@Resolver(() => IntegrationAuthScheme)
export class IntegrationAuthSchemeResolver {

   //Constructor del resolver de IntegrationAuthScheme
  constructor(
    private readonly service: IntegrationAuthSchemeQueryService,
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
      .registerClient(IntegrationAuthSchemeResolver.name)

      .get(IntegrationAuthSchemeResolver.name),
    })
  // Mutaciones
  @Mutation(() => IntegrationAuthSchemeResponse<IntegrationAuthScheme>)
  async createIntegrationAuthScheme(
    @Args("input", { type: () => CreateIntegrationAuthSchemeDto }) input: CreateIntegrationAuthSchemeDto
  ): Promise<IntegrationAuthSchemeResponse<IntegrationAuthScheme>> {
    return this.commandBus.execute(new CreateIntegrationAuthSchemeCommand(input));
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
      .registerClient(IntegrationAuthSchemeResolver.name)

      .get(IntegrationAuthSchemeResolver.name),
    })
  @Mutation(() => IntegrationAuthSchemeResponse<IntegrationAuthScheme>)
  async updateIntegrationAuthScheme(
    @Args("id", { type: () => String }) id: string,
    @Args("input") input: UpdateIntegrationAuthSchemeDto
  ): Promise<IntegrationAuthSchemeResponse<IntegrationAuthScheme>> {
    const payLoad = input;
    return this.commandBus.execute(
      new UpdateIntegrationAuthSchemeCommand(payLoad, {
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
      .registerClient(IntegrationAuthSchemeResolver.name)

      .get(IntegrationAuthSchemeResolver.name),
    })
  @Mutation(() => IntegrationAuthSchemeResponse<IntegrationAuthScheme>)
  async createOrUpdateIntegrationAuthScheme(
    @Args("data", { type: () => CreateOrUpdateIntegrationAuthSchemeDto })
    data: CreateOrUpdateIntegrationAuthSchemeDto
  ): Promise<IntegrationAuthSchemeResponse<IntegrationAuthScheme>> {
    if (data.id) {
      const existingIntegrationAuthScheme = await this.service.findById(data.id);
      if (existingIntegrationAuthScheme) {
        return this.commandBus.execute(
          new UpdateIntegrationAuthSchemeCommand(data, {
            instance: data,
            metadata: {
              initiatedBy:
                (data.input as CreateIntegrationAuthSchemeDto | UpdateIntegrationAuthSchemeDto).createdBy ||
                'system',
              correlationId: data.id,
            },
          })
        );
      }
    }
    return this.commandBus.execute(
      new CreateIntegrationAuthSchemeCommand(data, {
        instance: data,
        metadata: {
          initiatedBy:
            (data.input as CreateIntegrationAuthSchemeDto | UpdateIntegrationAuthSchemeDto).createdBy ||
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
      .registerClient(IntegrationAuthSchemeResolver.name)

      .get(IntegrationAuthSchemeResolver.name),
    })
  @Mutation(() => Boolean)
  async deleteIntegrationAuthScheme(
    @Args("id", { type: () => String }) id: string
  ): Promise<boolean> {
    return this.commandBus.execute(new DeleteIntegrationAuthSchemeCommand(id));
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
      .registerClient(IntegrationAuthSchemeResolver.name)

      .get(IntegrationAuthSchemeResolver.name),
    })
  // Queries
  @Query(() => IntegrationAuthSchemesResponse<IntegrationAuthScheme>)
  async integrationauthschemes(
    options?: FindManyOptions<IntegrationAuthScheme>,
    paginationArgs?: PaginationArgs
  ): Promise<IntegrationAuthSchemesResponse<IntegrationAuthScheme>> {
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
      .registerClient(IntegrationAuthSchemeResolver.name)

      .get(IntegrationAuthSchemeResolver.name),
    })
  @Query(() => IntegrationAuthSchemesResponse<IntegrationAuthScheme>)
  async integrationauthscheme(
    @Args("id", { type: () => String }) id: string
  ): Promise<IntegrationAuthSchemeResponse<IntegrationAuthScheme>> {
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
      .registerClient(IntegrationAuthSchemeResolver.name)

      .get(IntegrationAuthSchemeResolver.name),
    })
  @Query(() => IntegrationAuthSchemesResponse<IntegrationAuthScheme>)
  async integrationauthschemesByField(
    @Args("field", { type: () => String }) field: string,
    @Args("value", { type: () => IntegrationAuthSchemeValueInput }) value: IntegrationAuthSchemeValueInput,
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<IntegrationAuthSchemesResponse<IntegrationAuthScheme>> {
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
      .registerClient(IntegrationAuthSchemeResolver.name)

      .get(IntegrationAuthSchemeResolver.name),
    })
  @Query(() => IntegrationAuthSchemesResponse<IntegrationAuthScheme>)
  async integrationauthschemesWithPagination(
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<IntegrationAuthSchemesResponse<IntegrationAuthScheme>> {
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
      .registerClient(IntegrationAuthSchemeResolver.name)

      .get(IntegrationAuthSchemeResolver.name),
    })
  @Query(() => Number)
  async totalIntegrationAuthSchemes(): Promise<number> {
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
      .registerClient(IntegrationAuthSchemeResolver.name)

      .get(IntegrationAuthSchemeResolver.name),
    })
  @Query(() => IntegrationAuthSchemesResponse<IntegrationAuthScheme>)
  async searchIntegrationAuthSchemes(
    @Args("where", { type: () => IntegrationAuthSchemeDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationAuthSchemesResponse<IntegrationAuthScheme>> {
    const integrationauthschemes = await this.service.findAndCount(where);
    return integrationauthschemes;
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
      .registerClient(IntegrationAuthSchemeResolver.name)

      .get(IntegrationAuthSchemeResolver.name),
    })
  @Query(() => IntegrationAuthSchemeResponse<IntegrationAuthScheme>, { nullable: true })
  async findOneIntegrationAuthScheme(
    @Args("where", { type: () => IntegrationAuthSchemeDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationAuthSchemeResponse<IntegrationAuthScheme>> {
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
      .registerClient(IntegrationAuthSchemeResolver.name)

      .get(IntegrationAuthSchemeResolver.name),
    })
  @Query(() => IntegrationAuthSchemeResponse<IntegrationAuthScheme>)
  async findOneIntegrationAuthSchemeOrFail(
    @Args("where", { type: () => IntegrationAuthSchemeDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationAuthSchemeResponse<IntegrationAuthScheme> | Error> {
    return this.service.findOneOrFail(where);
  }
}

