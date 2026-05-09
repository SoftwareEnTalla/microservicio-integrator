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
import { IntegrationStatusCommandController } from "../controllers/integrationstatuscommand.controller";
import { IntegrationStatusQueryController } from "../controllers/integrationstatusquery.controller";
import { IntegrationStatusCommandService } from "../services/integrationstatuscommand.service";
import { IntegrationStatusQueryService } from "../services/integrationstatusquery.service";

import { IntegrationStatusCommandRepository } from "../repositories/integrationstatuscommand.repository";
import { IntegrationStatusQueryRepository } from "../repositories/integrationstatusquery.repository";
import { IntegrationStatusRepository } from "../repositories/integrationstatus.repository";
import { IntegrationStatusResolver } from "../graphql/integrationstatus.resolver";
import { IntegrationStatusAuthGuard } from "../guards/integrationstatusauthguard.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IntegrationStatus } from "../entities/integration-status.entity";
import { BaseEntity } from "../entities/base.entity";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-store";
import { CqrsModule } from "@nestjs/cqrs";
import { KafkaModule } from "./kafka.module";
import { CreateIntegrationStatusHandler } from "../commands/handlers/createintegrationstatus.handler";
import { UpdateIntegrationStatusHandler } from "../commands/handlers/updateintegrationstatus.handler";
import { DeleteIntegrationStatusHandler } from "../commands/handlers/deleteintegrationstatus.handler";
import { GetIntegrationStatusByIdHandler } from "../queries/handlers/getintegrationstatusbyid.handler";
import { GetIntegrationStatusByFieldHandler } from "../queries/handlers/getintegrationstatusbyfield.handler";
import { GetAllIntegrationStatusHandler } from "../queries/handlers/getallintegrationstatus.handler";
import { IntegrationStatusCrudSaga } from "../sagas/integrationstatus-crud.saga";

import { EVENT_TOPICS } from "../events/event-registry";

//Interceptors
import { IntegrationStatusInterceptor } from "../interceptors/integrationstatus.interceptor";
import { IntegrationStatusLoggingInterceptor } from "../interceptors/integrationstatus.logging.interceptor";

//Event-Sourcing dependencies
import { EventStoreService } from "../shared/event-store/event-store.service";

@Module({
  imports: [
    CqrsModule,
    KafkaModule,
    TypeOrmModule.forFeature([BaseEntity, IntegrationStatus]), // Incluir BaseEntity para herencia
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
  controllers: [IntegrationStatusCommandController, IntegrationStatusQueryController],
  providers: [
    //Services
    EventStoreService,
    IntegrationStatusQueryService,
    IntegrationStatusCommandService,
  
    //Repositories
    IntegrationStatusCommandRepository,
    IntegrationStatusQueryRepository,
    IntegrationStatusRepository,      
    //Resolvers
    IntegrationStatusResolver,
    //Guards
    IntegrationStatusAuthGuard,
    //Interceptors
    IntegrationStatusInterceptor,
    IntegrationStatusLoggingInterceptor,
    //CQRS Handlers
    CreateIntegrationStatusHandler,
    UpdateIntegrationStatusHandler,
    DeleteIntegrationStatusHandler,
    GetIntegrationStatusByIdHandler,
    GetIntegrationStatusByFieldHandler,
    GetAllIntegrationStatusHandler,
    IntegrationStatusCrudSaga,
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
    IntegrationStatusQueryService,
    IntegrationStatusCommandService,
  
    //Repositories
    IntegrationStatusCommandRepository,
    IntegrationStatusQueryRepository,
    IntegrationStatusRepository,      
    //Resolvers
    IntegrationStatusResolver,
    //Guards
    IntegrationStatusAuthGuard,
    //Interceptors
    IntegrationStatusInterceptor,
    IntegrationStatusLoggingInterceptor,
  ],
})
export class IntegrationStatusModule {}

