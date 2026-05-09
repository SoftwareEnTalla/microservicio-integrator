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
import { IntegrationEndpointCommandController } from "../controllers/integrationendpointcommand.controller";
import { IntegrationEndpointQueryController } from "../controllers/integrationendpointquery.controller";
import { IntegrationEndpointCommandService } from "../services/integrationendpointcommand.service";
import { IntegrationEndpointQueryService } from "../services/integrationendpointquery.service";

import { IntegrationEndpointCommandRepository } from "../repositories/integrationendpointcommand.repository";
import { IntegrationEndpointQueryRepository } from "../repositories/integrationendpointquery.repository";
import { IntegrationEndpointRepository } from "../repositories/integrationendpoint.repository";
import { IntegrationEndpointResolver } from "../graphql/integrationendpoint.resolver";
import { IntegrationEndpointAuthGuard } from "../guards/integrationendpointauthguard.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IntegrationEndpoint } from "../entities/integration-endpoint.entity";
import { BaseEntity } from "../entities/base.entity";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-store";
import { CqrsModule } from "@nestjs/cqrs";
import { KafkaModule } from "./kafka.module";
import { CreateIntegrationEndpointHandler } from "../commands/handlers/createintegrationendpoint.handler";
import { UpdateIntegrationEndpointHandler } from "../commands/handlers/updateintegrationendpoint.handler";
import { DeleteIntegrationEndpointHandler } from "../commands/handlers/deleteintegrationendpoint.handler";
import { GetIntegrationEndpointByIdHandler } from "../queries/handlers/getintegrationendpointbyid.handler";
import { GetIntegrationEndpointByFieldHandler } from "../queries/handlers/getintegrationendpointbyfield.handler";
import { GetAllIntegrationEndpointHandler } from "../queries/handlers/getallintegrationendpoint.handler";
import { IntegrationEndpointCrudSaga } from "../sagas/integrationendpoint-crud.saga";

import { EVENT_TOPICS } from "../events/event-registry";

//Interceptors
import { IntegrationEndpointInterceptor } from "../interceptors/integrationendpoint.interceptor";
import { IntegrationEndpointLoggingInterceptor } from "../interceptors/integrationendpoint.logging.interceptor";

//Event-Sourcing dependencies
import { EventStoreService } from "../shared/event-store/event-store.service";

@Module({
  imports: [
    CqrsModule,
    KafkaModule,
    TypeOrmModule.forFeature([BaseEntity, IntegrationEndpoint]), // Incluir BaseEntity para herencia
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
  controllers: [IntegrationEndpointCommandController, IntegrationEndpointQueryController],
  providers: [
    //Services
    EventStoreService,
    IntegrationEndpointQueryService,
    IntegrationEndpointCommandService,
  
    //Repositories
    IntegrationEndpointCommandRepository,
    IntegrationEndpointQueryRepository,
    IntegrationEndpointRepository,      
    //Resolvers
    IntegrationEndpointResolver,
    //Guards
    IntegrationEndpointAuthGuard,
    //Interceptors
    IntegrationEndpointInterceptor,
    IntegrationEndpointLoggingInterceptor,
    //CQRS Handlers
    CreateIntegrationEndpointHandler,
    UpdateIntegrationEndpointHandler,
    DeleteIntegrationEndpointHandler,
    GetIntegrationEndpointByIdHandler,
    GetIntegrationEndpointByFieldHandler,
    GetAllIntegrationEndpointHandler,
    IntegrationEndpointCrudSaga,
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
    IntegrationEndpointQueryService,
    IntegrationEndpointCommandService,
  
    //Repositories
    IntegrationEndpointCommandRepository,
    IntegrationEndpointQueryRepository,
    IntegrationEndpointRepository,      
    //Resolvers
    IntegrationEndpointResolver,
    //Guards
    IntegrationEndpointAuthGuard,
    //Interceptors
    IntegrationEndpointInterceptor,
    IntegrationEndpointLoggingInterceptor,
  ],
})
export class IntegrationEndpointModule {}

