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
import { IntegrationRuntimePolicy } from "../entities/integration-runtime-policy.entity";

//Definición de comandos
import {
  CreateIntegrationRuntimePolicyCommand,
  UpdateIntegrationRuntimePolicyCommand,
  DeleteIntegrationRuntimePolicyCommand,
} from "../commands/exporting.command";

import { CommandBus } from "@nestjs/cqrs";
import { IntegrationRuntimePolicyQueryService } from "../services/integrationruntimepolicyquery.service";


import { IntegrationRuntimePolicyResponse, IntegrationRuntimePolicysResponse } from "../types/integrationruntimepolicy.types";
import { FindManyOptions } from "typeorm";
import { PaginationArgs } from "src/common/dto/args/pagination.args";
import { fromObject } from "src/utils/functions";

//Logger
import { LogExecutionTime } from "src/common/logger/loggers.functions";
import { LoggerClient } from "src/common/logger/logger.client";
import { logger } from '@core/logs/logger';

import { v4 as uuidv4 } from "uuid";

//Definición de tdos
import { UpdateIntegrationRuntimePolicyDto, 
CreateOrUpdateIntegrationRuntimePolicyDto, 
IntegrationRuntimePolicyValueInput, 
IntegrationRuntimePolicyDto, 
CreateIntegrationRuntimePolicyDto } from "../dtos/all-dto";
 

//@UseGuards(JwtGraphQlAuthGuard)
@Resolver(() => IntegrationRuntimePolicy)
export class IntegrationRuntimePolicyResolver {

   //Constructor del resolver de IntegrationRuntimePolicy
  constructor(
    private readonly service: IntegrationRuntimePolicyQueryService,
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
      .registerClient(IntegrationRuntimePolicyResolver.name)

      .get(IntegrationRuntimePolicyResolver.name),
    })
  // Mutaciones
  @Mutation(() => IntegrationRuntimePolicyResponse<IntegrationRuntimePolicy>)
  async createIntegrationRuntimePolicy(
    @Args("input", { type: () => CreateIntegrationRuntimePolicyDto }) input: CreateIntegrationRuntimePolicyDto
  ): Promise<IntegrationRuntimePolicyResponse<IntegrationRuntimePolicy>> {
    return this.commandBus.execute(new CreateIntegrationRuntimePolicyCommand(input));
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
      .registerClient(IntegrationRuntimePolicyResolver.name)

      .get(IntegrationRuntimePolicyResolver.name),
    })
  @Mutation(() => IntegrationRuntimePolicyResponse<IntegrationRuntimePolicy>)
  async updateIntegrationRuntimePolicy(
    @Args("id", { type: () => String }) id: string,
    @Args("input") input: UpdateIntegrationRuntimePolicyDto
  ): Promise<IntegrationRuntimePolicyResponse<IntegrationRuntimePolicy>> {
    const payLoad = input;
    return this.commandBus.execute(
      new UpdateIntegrationRuntimePolicyCommand(payLoad, {
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
      .registerClient(IntegrationRuntimePolicyResolver.name)

      .get(IntegrationRuntimePolicyResolver.name),
    })
  @Mutation(() => IntegrationRuntimePolicyResponse<IntegrationRuntimePolicy>)
  async createOrUpdateIntegrationRuntimePolicy(
    @Args("data", { type: () => CreateOrUpdateIntegrationRuntimePolicyDto })
    data: CreateOrUpdateIntegrationRuntimePolicyDto
  ): Promise<IntegrationRuntimePolicyResponse<IntegrationRuntimePolicy>> {
    if (data.id) {
      const existingIntegrationRuntimePolicy = await this.service.findById(data.id);
      if (existingIntegrationRuntimePolicy) {
        return this.commandBus.execute(
          new UpdateIntegrationRuntimePolicyCommand(data, {
            instance: data,
            metadata: {
              initiatedBy:
                (data.input as CreateIntegrationRuntimePolicyDto | UpdateIntegrationRuntimePolicyDto).createdBy ||
                'system',
              correlationId: data.id,
            },
          })
        );
      }
    }
    return this.commandBus.execute(
      new CreateIntegrationRuntimePolicyCommand(data, {
        instance: data,
        metadata: {
          initiatedBy:
            (data.input as CreateIntegrationRuntimePolicyDto | UpdateIntegrationRuntimePolicyDto).createdBy ||
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
      .registerClient(IntegrationRuntimePolicyResolver.name)

      .get(IntegrationRuntimePolicyResolver.name),
    })
  @Mutation(() => Boolean)
  async deleteIntegrationRuntimePolicy(
    @Args("id", { type: () => String }) id: string
  ): Promise<boolean> {
    return this.commandBus.execute(new DeleteIntegrationRuntimePolicyCommand(id));
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
      .registerClient(IntegrationRuntimePolicyResolver.name)

      .get(IntegrationRuntimePolicyResolver.name),
    })
  // Queries
  @Query(() => IntegrationRuntimePolicysResponse<IntegrationRuntimePolicy>)
  async integrationruntimepolicys(
    options?: FindManyOptions<IntegrationRuntimePolicy>,
    paginationArgs?: PaginationArgs
  ): Promise<IntegrationRuntimePolicysResponse<IntegrationRuntimePolicy>> {
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
      .registerClient(IntegrationRuntimePolicyResolver.name)

      .get(IntegrationRuntimePolicyResolver.name),
    })
  @Query(() => IntegrationRuntimePolicysResponse<IntegrationRuntimePolicy>)
  async integrationruntimepolicy(
    @Args("id", { type: () => String }) id: string
  ): Promise<IntegrationRuntimePolicyResponse<IntegrationRuntimePolicy>> {
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
      .registerClient(IntegrationRuntimePolicyResolver.name)

      .get(IntegrationRuntimePolicyResolver.name),
    })
  @Query(() => IntegrationRuntimePolicysResponse<IntegrationRuntimePolicy>)
  async integrationruntimepolicysByField(
    @Args("field", { type: () => String }) field: string,
    @Args("value", { type: () => IntegrationRuntimePolicyValueInput }) value: IntegrationRuntimePolicyValueInput,
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<IntegrationRuntimePolicysResponse<IntegrationRuntimePolicy>> {
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
      .registerClient(IntegrationRuntimePolicyResolver.name)

      .get(IntegrationRuntimePolicyResolver.name),
    })
  @Query(() => IntegrationRuntimePolicysResponse<IntegrationRuntimePolicy>)
  async integrationruntimepolicysWithPagination(
    @Args("page", { type: () => Number, defaultValue: 1 }) page: number,
    @Args("limit", { type: () => Number, defaultValue: 10 }) limit: number
  ): Promise<IntegrationRuntimePolicysResponse<IntegrationRuntimePolicy>> {
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
      .registerClient(IntegrationRuntimePolicyResolver.name)

      .get(IntegrationRuntimePolicyResolver.name),
    })
  @Query(() => Number)
  async totalIntegrationRuntimePolicys(): Promise<number> {
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
      .registerClient(IntegrationRuntimePolicyResolver.name)

      .get(IntegrationRuntimePolicyResolver.name),
    })
  @Query(() => IntegrationRuntimePolicysResponse<IntegrationRuntimePolicy>)
  async searchIntegrationRuntimePolicys(
    @Args("where", { type: () => IntegrationRuntimePolicyDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationRuntimePolicysResponse<IntegrationRuntimePolicy>> {
    const integrationruntimepolicys = await this.service.findAndCount(where);
    return integrationruntimepolicys;
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
      .registerClient(IntegrationRuntimePolicyResolver.name)

      .get(IntegrationRuntimePolicyResolver.name),
    })
  @Query(() => IntegrationRuntimePolicyResponse<IntegrationRuntimePolicy>, { nullable: true })
  async findOneIntegrationRuntimePolicy(
    @Args("where", { type: () => IntegrationRuntimePolicyDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationRuntimePolicyResponse<IntegrationRuntimePolicy>> {
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
      .registerClient(IntegrationRuntimePolicyResolver.name)

      .get(IntegrationRuntimePolicyResolver.name),
    })
  @Query(() => IntegrationRuntimePolicyResponse<IntegrationRuntimePolicy>)
  async findOneIntegrationRuntimePolicyOrFail(
    @Args("where", { type: () => IntegrationRuntimePolicyDto, nullable: false })
    where: Record<string, any>
  ): Promise<IntegrationRuntimePolicyResponse<IntegrationRuntimePolicy> | Error> {
    return this.service.findOneOrFail(where);
  }
}

