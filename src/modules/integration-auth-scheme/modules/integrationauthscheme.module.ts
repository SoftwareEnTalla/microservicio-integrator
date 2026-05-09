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
import { IntegrationAuthSchemeCommandController } from "../controllers/integrationauthschemecommand.controller";
import { IntegrationAuthSchemeQueryController } from "../controllers/integrationauthschemequery.controller";
import { IntegrationAuthSchemeCommandService } from "../services/integrationauthschemecommand.service";
import { IntegrationAuthSchemeQueryService } from "../services/integrationauthschemequery.service";

import { IntegrationAuthSchemeCommandRepository } from "../repositories/integrationauthschemecommand.repository";
import { IntegrationAuthSchemeQueryRepository } from "../repositories/integrationauthschemequery.repository";
import { IntegrationAuthSchemeRepository } from "../repositories/integrationauthscheme.repository";
import { IntegrationAuthSchemeResolver } from "../graphql/integrationauthscheme.resolver";
import { IntegrationAuthSchemeAuthGuard } from "../guards/integrationauthschemeauthguard.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IntegrationAuthScheme } from "../entities/integration-auth-scheme.entity";
import { BaseEntity } from "../entities/base.entity";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-store";
import { CqrsModule } from "@nestjs/cqrs";
import { KafkaModule } from "./kafka.module";
import { CreateIntegrationAuthSchemeHandler } from "../commands/handlers/createintegrationauthscheme.handler";
import { UpdateIntegrationAuthSchemeHandler } from "../commands/handlers/updateintegrationauthscheme.handler";
import { DeleteIntegrationAuthSchemeHandler } from "../commands/handlers/deleteintegrationauthscheme.handler";
import { GetIntegrationAuthSchemeByIdHandler } from "../queries/handlers/getintegrationauthschemebyid.handler";
import { GetIntegrationAuthSchemeByFieldHandler } from "../queries/handlers/getintegrationauthschemebyfield.handler";
import { GetAllIntegrationAuthSchemeHandler } from "../queries/handlers/getallintegrationauthscheme.handler";
import { IntegrationAuthSchemeCrudSaga } from "../sagas/integrationauthscheme-crud.saga";

import { EVENT_TOPICS } from "../events/event-registry";

//Interceptors
import { IntegrationAuthSchemeInterceptor } from "../interceptors/integrationauthscheme.interceptor";
import { IntegrationAuthSchemeLoggingInterceptor } from "../interceptors/integrationauthscheme.logging.interceptor";

//Event-Sourcing dependencies
import { EventStoreService } from "../shared/event-store/event-store.service";

@Module({
  imports: [
    CqrsModule,
    KafkaModule,
    TypeOrmModule.forFeature([BaseEntity, IntegrationAuthScheme]), // Incluir BaseEntity para herencia
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
  controllers: [IntegrationAuthSchemeCommandController, IntegrationAuthSchemeQueryController],
  providers: [
    //Services
    EventStoreService,
    IntegrationAuthSchemeQueryService,
    IntegrationAuthSchemeCommandService,
  
    //Repositories
    IntegrationAuthSchemeCommandRepository,
    IntegrationAuthSchemeQueryRepository,
    IntegrationAuthSchemeRepository,      
    //Resolvers
    IntegrationAuthSchemeResolver,
    //Guards
    IntegrationAuthSchemeAuthGuard,
    //Interceptors
    IntegrationAuthSchemeInterceptor,
    IntegrationAuthSchemeLoggingInterceptor,
    //CQRS Handlers
    CreateIntegrationAuthSchemeHandler,
    UpdateIntegrationAuthSchemeHandler,
    DeleteIntegrationAuthSchemeHandler,
    GetIntegrationAuthSchemeByIdHandler,
    GetIntegrationAuthSchemeByFieldHandler,
    GetAllIntegrationAuthSchemeHandler,
    IntegrationAuthSchemeCrudSaga,
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
    IntegrationAuthSchemeQueryService,
    IntegrationAuthSchemeCommandService,
  
    //Repositories
    IntegrationAuthSchemeCommandRepository,
    IntegrationAuthSchemeQueryRepository,
    IntegrationAuthSchemeRepository,      
    //Resolvers
    IntegrationAuthSchemeResolver,
    //Guards
    IntegrationAuthSchemeAuthGuard,
    //Interceptors
    IntegrationAuthSchemeInterceptor,
    IntegrationAuthSchemeLoggingInterceptor,
  ],
})
export class IntegrationAuthSchemeModule {}

