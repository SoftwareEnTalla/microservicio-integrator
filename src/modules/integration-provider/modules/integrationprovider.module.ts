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
import { IntegrationProviderCommandController } from "../controllers/integrationprovidercommand.controller";
import { IntegrationProviderQueryController } from "../controllers/integrationproviderquery.controller";
import { IntegrationProviderCommandService } from "../services/integrationprovidercommand.service";
import { IntegrationProviderQueryService } from "../services/integrationproviderquery.service";

import { IntegrationProviderCommandRepository } from "../repositories/integrationprovidercommand.repository";
import { IntegrationProviderQueryRepository } from "../repositories/integrationproviderquery.repository";
import { IntegrationProviderRepository } from "../repositories/integrationprovider.repository";
import { IntegrationProviderResolver } from "../graphql/integrationprovider.resolver";
import { IntegrationProviderAuthGuard } from "../guards/integrationproviderauthguard.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IntegrationProvider } from "../entities/integration-provider.entity";
import { BaseEntity } from "../entities/base.entity";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-store";
import { CqrsModule } from "@nestjs/cqrs";
import { KafkaModule } from "./kafka.module";
import { CreateIntegrationProviderHandler } from "../commands/handlers/createintegrationprovider.handler";
import { UpdateIntegrationProviderHandler } from "../commands/handlers/updateintegrationprovider.handler";
import { DeleteIntegrationProviderHandler } from "../commands/handlers/deleteintegrationprovider.handler";
import { GetIntegrationProviderByIdHandler } from "../queries/handlers/getintegrationproviderbyid.handler";
import { GetIntegrationProviderByFieldHandler } from "../queries/handlers/getintegrationproviderbyfield.handler";
import { GetAllIntegrationProviderHandler } from "../queries/handlers/getallintegrationprovider.handler";
import { IntegrationProviderCrudSaga } from "../sagas/integrationprovider-crud.saga";

import { EVENT_TOPICS } from "../events/event-registry";

//Interceptors
import { IntegrationProviderInterceptor } from "../interceptors/integrationprovider.interceptor";
import { IntegrationProviderLoggingInterceptor } from "../interceptors/integrationprovider.logging.interceptor";

//Event-Sourcing dependencies
import { EventStoreService } from "../shared/event-store/event-store.service";

@Module({
  imports: [
    CqrsModule,
    KafkaModule,
    TypeOrmModule.forFeature([BaseEntity, IntegrationProvider]), // Incluir BaseEntity para herencia
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
  controllers: [IntegrationProviderCommandController, IntegrationProviderQueryController],
  providers: [
    //Services
    EventStoreService,
    IntegrationProviderQueryService,
    IntegrationProviderCommandService,
  
    //Repositories
    IntegrationProviderCommandRepository,
    IntegrationProviderQueryRepository,
    IntegrationProviderRepository,      
    //Resolvers
    IntegrationProviderResolver,
    //Guards
    IntegrationProviderAuthGuard,
    //Interceptors
    IntegrationProviderInterceptor,
    IntegrationProviderLoggingInterceptor,
    //CQRS Handlers
    CreateIntegrationProviderHandler,
    UpdateIntegrationProviderHandler,
    DeleteIntegrationProviderHandler,
    GetIntegrationProviderByIdHandler,
    GetIntegrationProviderByFieldHandler,
    GetAllIntegrationProviderHandler,
    IntegrationProviderCrudSaga,
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
    IntegrationProviderQueryService,
    IntegrationProviderCommandService,
  
    //Repositories
    IntegrationProviderCommandRepository,
    IntegrationProviderQueryRepository,
    IntegrationProviderRepository,      
    //Resolvers
    IntegrationProviderResolver,
    //Guards
    IntegrationProviderAuthGuard,
    //Interceptors
    IntegrationProviderInterceptor,
    IntegrationProviderLoggingInterceptor,
  ],
})
export class IntegrationProviderModule {}

