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
import { IntegrationRuntimePolicyCommandController } from "../controllers/integrationruntimepolicycommand.controller";
import { IntegrationRuntimePolicyQueryController } from "../controllers/integrationruntimepolicyquery.controller";
import { IntegrationRuntimePolicyCommandService } from "../services/integrationruntimepolicycommand.service";
import { IntegrationRuntimePolicyQueryService } from "../services/integrationruntimepolicyquery.service";

import { IntegrationRuntimePolicyCommandRepository } from "../repositories/integrationruntimepolicycommand.repository";
import { IntegrationRuntimePolicyQueryRepository } from "../repositories/integrationruntimepolicyquery.repository";
import { IntegrationRuntimePolicyRepository } from "../repositories/integrationruntimepolicy.repository";
import { IntegrationRuntimePolicyResolver } from "../graphql/integrationruntimepolicy.resolver";
import { IntegrationRuntimePolicyAuthGuard } from "../guards/integrationruntimepolicyauthguard.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IntegrationRuntimePolicy } from "../entities/integration-runtime-policy.entity";
import { BaseEntity } from "../entities/base.entity";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-store";
import { CqrsModule } from "@nestjs/cqrs";
import { KafkaModule } from "./kafka.module";
import { CreateIntegrationRuntimePolicyHandler } from "../commands/handlers/createintegrationruntimepolicy.handler";
import { UpdateIntegrationRuntimePolicyHandler } from "../commands/handlers/updateintegrationruntimepolicy.handler";
import { DeleteIntegrationRuntimePolicyHandler } from "../commands/handlers/deleteintegrationruntimepolicy.handler";
import { GetIntegrationRuntimePolicyByIdHandler } from "../queries/handlers/getintegrationruntimepolicybyid.handler";
import { GetIntegrationRuntimePolicyByFieldHandler } from "../queries/handlers/getintegrationruntimepolicybyfield.handler";
import { GetAllIntegrationRuntimePolicyHandler } from "../queries/handlers/getallintegrationruntimepolicy.handler";
import { IntegrationRuntimePolicyCrudSaga } from "../sagas/integrationruntimepolicy-crud.saga";

import { EVENT_TOPICS } from "../events/event-registry";

//Interceptors
import { IntegrationRuntimePolicyInterceptor } from "../interceptors/integrationruntimepolicy.interceptor";
import { IntegrationRuntimePolicyLoggingInterceptor } from "../interceptors/integrationruntimepolicy.logging.interceptor";

//Event-Sourcing dependencies
import { EventStoreService } from "../shared/event-store/event-store.service";

@Module({
  imports: [
    CqrsModule,
    KafkaModule,
    TypeOrmModule.forFeature([BaseEntity, IntegrationRuntimePolicy]), // Incluir BaseEntity para herencia
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
  controllers: [IntegrationRuntimePolicyCommandController, IntegrationRuntimePolicyQueryController],
  providers: [
    //Services
    EventStoreService,
    IntegrationRuntimePolicyQueryService,
    IntegrationRuntimePolicyCommandService,
  
    //Repositories
    IntegrationRuntimePolicyCommandRepository,
    IntegrationRuntimePolicyQueryRepository,
    IntegrationRuntimePolicyRepository,      
    //Resolvers
    IntegrationRuntimePolicyResolver,
    //Guards
    IntegrationRuntimePolicyAuthGuard,
    //Interceptors
    IntegrationRuntimePolicyInterceptor,
    IntegrationRuntimePolicyLoggingInterceptor,
    //CQRS Handlers
    CreateIntegrationRuntimePolicyHandler,
    UpdateIntegrationRuntimePolicyHandler,
    DeleteIntegrationRuntimePolicyHandler,
    GetIntegrationRuntimePolicyByIdHandler,
    GetIntegrationRuntimePolicyByFieldHandler,
    GetAllIntegrationRuntimePolicyHandler,
    IntegrationRuntimePolicyCrudSaga,
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
    IntegrationRuntimePolicyQueryService,
    IntegrationRuntimePolicyCommandService,
  
    //Repositories
    IntegrationRuntimePolicyCommandRepository,
    IntegrationRuntimePolicyQueryRepository,
    IntegrationRuntimePolicyRepository,      
    //Resolvers
    IntegrationRuntimePolicyResolver,
    //Guards
    IntegrationRuntimePolicyAuthGuard,
    //Interceptors
    IntegrationRuntimePolicyInterceptor,
    IntegrationRuntimePolicyLoggingInterceptor,
  ],
})
export class IntegrationRuntimePolicyModule {}

