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
import { IntegrationStatus } from "../entities/integration-status.entity";

//Definición de comandos
import {
  CreateIntegrationStatusCommand,
  UpdateIntegrationStatusCommand,
  DeleteIntegrationStatusCommand,
} from "../commands/exporting.command";

import { CommandBus } from "@nestjs/cqrs";
import { IntegrationStatusQueryService } from "../services/integrationstatusquery.service";


import { IntegrationStatusResponse, IntegrationStatussResponse } from "../types/integrationstatus.types";
import { FindManyOptions } from "typeorm";
import { PaginationArgs } from "src/common/dto/args/pagination.args";
import { fromObject } from "src/utils/functions";

//Logger
import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { LoggerClient } from "src/common/logger/logger.client";
import { logger } from '@core/logs/logger';

import { v4 as uuidv4 } from "uuid";

//Definición de tdos
import { UpdateIntegrationStatusDto, 
CreateOrUpdateIntegrationStatusDto, 
IntegrationStatusValueInput, 
IntegrationStatusDto, 
CreateIntegrationStatusDto } from "../dtos/all-dto";
 

//@UseGuards(JwtGraphQlAuthGuard)
@Resolver(() => IntegrationStatus)
export class IntegrationStatusResolver {

   //Constructor del resolver de IntegrationStatus
  constructor(
    private readonly service: IntegrationStatusQueryService,
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
      .registerClient(IntegrationStatusResolver.name)

      .get(IntegrationStatusResolver.name),
    })
  // Mutaciones
  @Mutation(() => IntegrationStatusResponse<IntegrationStatus>)
  async createIntegrationStatus(
    @Args("input", { type: () => CreateIntegrationStatusDto }) input: CreateIntegrationStatusDto
  ): Promise<IntegrationStatusResponse<IntegrationStatus>> {
    return this.commandBus.execute(new CreateIntegrationStatusCommand(input));
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
      .registerClient(IntegrationStatusResolver.name)

      .get(IntegrationStatusResolver.name),
    })
  @Mutation(() => IntegrationStatusResponse<IntegrationStatus>)
  async updateIntegrationStatus(
    @Args("id", { type: () => String }) id: string,
    @Args("input") input: UpdateIntegrationStatusDto
  ): Promise<IntegrationStatusResponse<IntegrationStatus>> {
    const payLoad = input;
    return this.commandBus.execute(
      new UpdateIntegrationStatusCommand(payLoad, {
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
      .registerClient(IntegrationStatusResolver.name)

      .get(IntegrationStatusResolver.name),
    })
  @Mutation(() => IntegrationStatusResponse<IntegrationStatus>)
  async createOrUpdateIntegrationStatus(
    @Args("data", { type: () => CreateOrUpdateIntegrationStatusDto })
    data: CreateOrUpdateIntegrationStatusDto
  ): Promise<IntegrationStatusResponse<IntegrationStatus>> {
    if (data.id) {
      const existingIntegrationStatus = await this.service.findById(data.id);
      if (existingIntegrationStatus) {
        return this.commandBus.execute(
          new UpdateIntegrationStatusCommand(data, {
            instance: data,
            metadata: {
              initiatedBy:
                (data.input as CreateIntegrationStatusDto | UpdateIntegrationStatusDto).createdBy ||
                'system',
              correlationId: data.id,
            },
          })
        );
      }
    }
    return this.commandBus.execute(
      new CreateIntegrationStatusCommand(data, {
        instance: data,
        metadata: {
          initiatedBy:
            (data.input as CreateIntegrationStatusDto | UpdateIntegrationStatusDto).createdBy ||
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
      .registerClient(IntegrationStatusResolver.name)

      .get(IntegrationStatusResolver.name),
    })
  @Mutation(() => Boolean)
  async deleteIntegrationStatus(
    @Args("id", { type: () => String }) id: string
  ): Promise<boolean> {
    return this.commandBus.execute(new DeleteIntegrationStatusCommand(id));
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
      .registerClient(IntegrationStatusResolver.name)

      .get(IntegrationStatusResolver.name),
    })
  // Queries
  @Query(() => IntegrationStatussResponse<IntegrationStatus>)
  async integrationstatuss(
    options?: FindManyOptions<IntegrationStatus>,
    paginationArgs?: PaginationArgs
  ): Promise<IntegrationStatussResponse<IntegrationStatus>> {
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
      .registerClient(IntegrationStatusResolver.name)

      .get(IntegrationStatusResolver.name),
    })
  @Query(() => IntegrationStatussResponse<IntegrationStatus>)
  async integrationstatus(
    @Args("id", { type: () => String }) id: string
  ): Promise<IntegrationStatusResponse<IntegrationStatus>> {
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
      .registerClient(IntegrationStatusResolver.name)

      .get(IntegrationStatusResolver.name),
    })
  @Query(() => IntegrationStatussResponse<IntegrationStatus>)
  async integrationstatussByField(
    @Args("field", { type: () => String }) field: string,
    @Args("value", { type: () => IntegrationStatusValueInput }) value: IntegrationStatusValueInput,
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<IntegrationStatussResponse<IntegrationStatus>> {
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
      .registerClient(IntegrationStatusResolver.name)

      .get(IntegrationStatusResolver.name),
    })
  @Query(() => IntegrationStatussResponse<IntegrationStatus>)
  async integrationstatussWithPagination(
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<IntegrationStatussResponse<IntegrationStatus>> {
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
      .registerClient(IntegrationStatusResolver.name)

      .get(IntegrationStatusResolver.name),
    })
  @Query(() => Number)
  async totalIntegrationStatuss(): Promise<number> {
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
      .registerClient(IntegrationStatusResolver.name)

      .get(IntegrationStatusResolver.name),
    })
  @Query(() => IntegrationStatussResponse<IntegrationStatus>)
  async searchIntegrationStatuss(
    @Args("where", { type: () => IntegrationStatusDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationStatussResponse<IntegrationStatus>> {
    const integrationstatuss = await this.service.findAndCount(where);
    return integrationstatuss;
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
      .registerClient(IntegrationStatusResolver.name)

      .get(IntegrationStatusResolver.name),
    })
  @Query(() => IntegrationStatusResponse<IntegrationStatus>, { nullable: true })
  async findOneIntegrationStatus(
    @Args("where", { type: () => IntegrationStatusDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationStatusResponse<IntegrationStatus>> {
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
      .registerClient(IntegrationStatusResolver.name)

      .get(IntegrationStatusResolver.name),
    })
  @Query(() => IntegrationStatusResponse<IntegrationStatus>)
  async findOneIntegrationStatusOrFail(
    @Args("where", { type: () => IntegrationStatusDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationStatusResponse<IntegrationStatus> | Error> {
    return this.service.findOneOrFail(where);
  }
}

