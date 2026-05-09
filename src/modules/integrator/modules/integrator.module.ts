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


import { Module } from "@nestjs/common";
import { IntegratorCommandController } from "../controllers/integratorcommand.controller";
import { IntegratorQueryController } from "../controllers/integratorquery.controller";
import { IntegratorCommandService } from "../services/integratorcommand.service";
import { IntegratorQueryService } from "../services/integratorquery.service";

import { IntegratorCommandRepository } from "../repositories/integratorcommand.repository";
import { IntegratorQueryRepository } from "../repositories/integratorquery.repository";
import { IntegratorRepository } from "../repositories/integrator.repository";
import { IntegratorResolver } from "../graphql/integrator.resolver";
import { IntegratorAuthGuard } from "../guards/integratorauthguard.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Integrator } from "../entities/integrator.entity";
import { BaseEntity } from "../entities/base.entity";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-store";
import { CqrsModule } from "@nestjs/cqrs";
import { KafkaModule } from "./kafka.module";
import { CreateIntegratorHandler } from "../commands/handlers/createintegrator.handler";
import { UpdateIntegratorHandler } from "../commands/handlers/updateintegrator.handler";
import { DeleteIntegratorHandler } from "../commands/handlers/deleteintegrator.handler";
import { GetIntegratorByIdHandler } from "../queries/handlers/getintegratorbyid.handler";
import { GetIntegratorByFieldHandler } from "../queries/handlers/getintegratorbyfield.handler";
import { GetAllIntegratorHandler } from "../queries/handlers/getallintegrator.handler";
import { IntegratorCrudSaga } from "../sagas/integrator-crud.saga";

import { EVENT_TOPICS } from "../events/event-registry";

//Interceptors
import { IntegratorInterceptor } from "../interceptors/integrator.interceptor";
import { IntegratorLoggingInterceptor } from "../interceptors/integrator.logging.interceptor";

//Event-Sourcing dependencies
import { EventStoreService } from "../shared/event-store/event-store.service";

@Module({
  imports: [
    CqrsModule,
    KafkaModule,
    TypeOrmModule.forFeature([BaseEntity, Integrator]), // Incluir BaseEntity para herencia
    CacheModule.registerAsync({
      useFactory: async () => {
        try {
          const store = await redisStore({
            socket: { host: process.env.REDIS_HOST || "data-center-redis", port: parseInt(process.env.REDIS_PORT || "6379", 10) },
            ttl: parseInt(process.env.REDIS_TTL || "60", 10),
          });
          return { store: store as any, isGlobal: true };
        } catch {
          return { isGlobal: true }; // fallback in-memory
        }
      },
    }),
  ],
  controllers: [IntegratorCommandController, IntegratorQueryController],
  providers: [
    //Services
    EventStoreService,
    IntegratorQueryService,
    IntegratorCommandService,
  
    //Repositories
    IntegratorCommandRepository,
    IntegratorQueryRepository,
    IntegratorRepository,      
    //Resolvers
    IntegratorResolver,
    //Guards
    IntegratorAuthGuard,
    //Interceptors
    IntegratorInterceptor,
    IntegratorLoggingInterceptor,
    //CQRS Handlers
    CreateIntegratorHandler,
    UpdateIntegratorHandler,
    DeleteIntegratorHandler,
    GetIntegratorByIdHandler,
    GetIntegratorByFieldHandler,
    GetAllIntegratorHandler,
    IntegratorCrudSaga,
    //Configurations
    {
      provide: 'EVENT_SOURCING_CONFIG',
      useFactory: () => ({
        enabled: process.env.EVENT_SOURCING_ENABLED !== 'false',
        kafkaEnabled: process.env.KAFKA_ENABLED !== 'false',
        eventStoreEnabled: process.env.EVENT_STORE_ENABLED === 'true',
        publishEvents: true,
        useProjections: true,
        topics: EVENT_TOPICS
      })
    },
  ],
  exports: [
    CqrsModule,
    KafkaModule,
    //Services
    EventStoreService,
    IntegratorQueryService,
    IntegratorCommandService,
  
    //Repositories
    IntegratorCommandRepository,
    IntegratorQueryRepository,
    IntegratorRepository,      
    //Resolvers
    IntegratorResolver,
    //Guards
    IntegratorAuthGuard,
    //Interceptors
    IntegratorInterceptor,
    IntegratorLoggingInterceptor,
  ],
})
export class IntegratorModule {}

