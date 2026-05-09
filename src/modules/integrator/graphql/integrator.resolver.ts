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
import { Integrator } from "../entities/integrator.entity";

//Definición de comandos
import {
  CreateIntegratorCommand,
  UpdateIntegratorCommand,
  DeleteIntegratorCommand,
} from "../commands/exporting.command";

import { CommandBus } from "@nestjs/cqrs";
import { IntegratorQueryService } from "../services/integratorquery.service";


import { IntegratorResponse, IntegratorsResponse } from "../types/integrator.types";
import { FindManyOptions } from "typeorm";
import { PaginationArgs } from "src/common/dto/args/pagination.args";
import { fromObject } from "src/utils/functions";

//Logger
import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { LoggerClient } from "src/common/logger/logger.client";
import { logger } from '@core/logs/logger';

import { v4 as uuidv4 } from "uuid";

//Definición de tdos
import { UpdateIntegratorDto, 
CreateOrUpdateIntegratorDto, 
IntegratorValueInput, 
IntegratorDto, 
CreateIntegratorDto } from "../dtos/all-dto";
 

//@UseGuards(JwtGraphQlAuthGuard)
@Resolver(() => Integrator)
export class IntegratorResolver {

   //Constructor del resolver de Integrator
  constructor(
    private readonly service: IntegratorQueryService,
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
      .registerClient(IntegratorResolver.name)

      .get(IntegratorResolver.name),
    })
  // Mutaciones
  @Mutation(() => IntegratorResponse<Integrator>)
  async createIntegrator(
    @Args("input", { type: () => CreateIntegratorDto }) input: CreateIntegratorDto
  ): Promise<IntegratorResponse<Integrator>> {
    return this.commandBus.execute(new CreateIntegratorCommand(input));
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
      .registerClient(IntegratorResolver.name)

      .get(IntegratorResolver.name),
    })
  @Mutation(() => IntegratorResponse<Integrator>)
  async updateIntegrator(
    @Args("id", { type: () => String }) id: string,
    @Args("input") input: UpdateIntegratorDto
  ): Promise<IntegratorResponse<Integrator>> {
    const payLoad = input;
    return this.commandBus.execute(
      new UpdateIntegratorCommand(payLoad, {
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
      .registerClient(IntegratorResolver.name)

      .get(IntegratorResolver.name),
    })
  @Mutation(() => IntegratorResponse<Integrator>)
  async createOrUpdateIntegrator(
    @Args("data", { type: () => CreateOrUpdateIntegratorDto })
    data: CreateOrUpdateIntegratorDto
  ): Promise<IntegratorResponse<Integrator>> {
    if (data.id) {
      const existingIntegrator = await this.service.findById(data.id);
      if (existingIntegrator) {
        return this.commandBus.execute(
          new UpdateIntegratorCommand(data, {
            instance: data,
            metadata: {
              initiatedBy:
                (data.input as CreateIntegratorDto | UpdateIntegratorDto).createdBy ||
                'system',
              correlationId: data.id,
            },
          })
        );
      }
    }
    return this.commandBus.execute(
      new CreateIntegratorCommand(data, {
        instance: data,
        metadata: {
          initiatedBy:
            (data.input as CreateIntegratorDto | UpdateIntegratorDto).createdBy ||
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
      .registerClient(IntegratorResolver.name)

      .get(IntegratorResolver.name),
    })
  @Mutation(() => Boolean)
  async deleteIntegrator(
    @Args("id", { type: () => String }) id: string
  ): Promise<boolean> {
    return this.commandBus.execute(new DeleteIntegratorCommand(id));
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
      .registerClient(IntegratorResolver.name)

      .get(IntegratorResolver.name),
    })
  // Queries
  @Query(() => IntegratorsResponse<Integrator>)
  async integrators(
    options?: FindManyOptions<Integrator>,
    paginationArgs?: PaginationArgs
  ): Promise<IntegratorsResponse<Integrator>> {
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
      .registerClient(IntegratorResolver.name)

      .get(IntegratorResolver.name),
    })
  @Query(() => IntegratorsResponse<Integrator>)
  async integrator(
    @Args("id", { type: () => String }) id: string
  ): Promise<IntegratorResponse<Integrator>> {
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
      .registerClient(IntegratorResolver.name)

      .get(IntegratorResolver.name),
    })
  @Query(() => IntegratorsResponse<Integrator>)
  async integratorsByField(
    @Args("field", { type: () => String }) field: string,
    @Args("value", { type: () => IntegratorValueInput }) value: IntegratorValueInput,
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<IntegratorsResponse<Integrator>> {
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
      .registerClient(IntegratorResolver.name)

      .get(IntegratorResolver.name),
    })
  @Query(() => IntegratorsResponse<Integrator>)
  async integratorsWithPagination(
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<IntegratorsResponse<Integrator>> {
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
      .registerClient(IntegratorResolver.name)

      .get(IntegratorResolver.name),
    })
  @Query(() => Number)
  async totalIntegrators(): Promise<number> {
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
      .registerClient(IntegratorResolver.name)

      .get(IntegratorResolver.name),
    })
  @Query(() => IntegratorsResponse<Integrator>)
  async searchIntegrators(
    @Args("where", { type: () => IntegratorDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegratorsResponse<Integrator>> {
    const integrators = await this.service.findAndCount(where);
    return integrators;
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
      .registerClient(IntegratorResolver.name)

      .get(IntegratorResolver.name),
    })
  @Query(() => IntegratorResponse<Integrator>, { nullable: true })
  async findOneIntegrator(
    @Args("where", { type: () => IntegratorDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegratorResponse<Integrator>> {
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
      .registerClient(IntegratorResolver.name)

      .get(IntegratorResolver.name),
    })
  @Query(() => IntegratorResponse<Integrator>)
  async findOneIntegratorOrFail(
    @Args("where", { type: () => IntegratorDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegratorResponse<Integrator> | Error> {
    return this.service.findOneOrFail(where);
  }
}

