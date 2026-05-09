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


import { DynamicModule, Module, OnModuleInit, Optional, Inject } from "@nestjs/common";
import { DataSource } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { IntegratorCommandController } from "./modules/integrator/controllers/integratorcommand.controller";
import { IntegratorModule } from "./modules/integrator/modules/integrator.module";
import { CqrsModule } from "@nestjs/cqrs";
import { AppDataSource, initializeDatabase } from "./data-source";
import { IntegratorQueryController } from "./modules/integrator/controllers/integratorquery.controller";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import GraphQLJSON from "graphql-type-json";
import { IntegratorCommandService } from "./modules/integrator/services/integratorcommand.service";
import { IntegratorQueryService } from "./modules/integrator/services/integratorquery.service";
import { CacheModule } from "@nestjs/cache-manager";
import { LoggingModule } from "./modules/integrator/modules/logger.module";
import { CatalogClientModule } from "./modules/catalog-client/catalog-client.module";
import { ModuleRef } from "@nestjs/core";
import { ServiceRegistry } from "@core/service-registry";
import LoggerService, { logger } from "@core/logs/logger";
import { HorizontalModule } from "@common/horizontal";
import { IntegrationAuthSchemeModule } from "./modules/integration-auth-scheme/modules/integrationauthscheme.module";
import { IntegrationAuthSchemeCommandService } from "./modules/integration-auth-scheme/services/integrationauthschemecommand.service";
import { IntegrationAuthSchemeQueryService } from "./modules/integration-auth-scheme/services/integrationauthschemequery.service";
import { IntegrationCredentialModule } from "./modules/integration-credential/modules/integrationcredential.module";
import { IntegrationCredentialCommandService } from "./modules/integration-credential/services/integrationcredentialcommand.service";
import { IntegrationCredentialQueryService } from "./modules/integration-credential/services/integrationcredentialquery.service";
import { IntegrationEndpointModule } from "./modules/integration-endpoint/modules/integrationendpoint.module";
import { IntegrationEndpointCommandService } from "./modules/integration-endpoint/services/integrationendpointcommand.service";
import { IntegrationEndpointQueryService } from "./modules/integration-endpoint/services/integrationendpointquery.service";
import { IntegrationProviderModule } from "./modules/integration-provider/modules/integrationprovider.module";
import { IntegrationProviderCommandService } from "./modules/integration-provider/services/integrationprovidercommand.service";
import { IntegrationProviderQueryService } from "./modules/integration-provider/services/integrationproviderquery.service";
import { IntegrationRuntimePolicyModule } from "./modules/integration-runtime-policy/modules/integrationruntimepolicy.module";
import { IntegrationRuntimePolicyCommandService } from "./modules/integration-runtime-policy/services/integrationruntimepolicycommand.service";
import { IntegrationRuntimePolicyQueryService } from "./modules/integration-runtime-policy/services/integrationruntimepolicyquery.service";
import { IntegrationStatusModule } from "./modules/integration-status/modules/integrationstatus.module";
import { IntegrationStatusCommandService } from "./modules/integration-status/services/integrationstatuscommand.service";
import { IntegrationStatusQueryService } from "./modules/integration-status/services/integrationstatusquery.service";

/*
//TODO unused for while dependencies
import { I18nModule } from "nestjs-i18n";
import { join } from "path";
import { CustomI18nLoader } from "./core/loaders/custom-I18n-Loader";
import { TranslocoService } from "@jsverse/transloco";
import { HeaderResolver, AcceptLanguageResolver } from "nestjs-i18n";
import { TranslocoWrapperService } from "./core/services/transloco-wrapper.service";
import { TranslocoModule } from "@ngneat/transloco";
import LoggerService, { logger } from "@core/logs/logger";

*/

@Module({
  imports: [
    // Se importa/registra el módulo de caché
    CacheModule.register(),

    /**
     * ConfigModule - Configuración global de variables de entorno
     *
     * Configuración centralizada para el manejo de variables de entorno.
     * Se establece como global para estar disponible en toda la aplicación.
     */
    ConfigModule.forRoot({
      isGlobal: true, // Disponible en todos los módulos sin necesidad de importar
      envFilePath: ".env", // Ubicación del archivo .env
      cache: true, // Mejora rendimiento cacheando las variables
      expandVariables: true, // Permite usar variables anidadas (ej: )
    }),

    /**
     * TypeOrmModule - Configuración de la base de datos
     *
     * Conexión asíncrona con PostgreSQL y configuración avanzada.
     * Se inicializa primero la conexión a la base de datos.
     */
    // TypeORM solo si INCLUDING_DATA_BASE_SYSTEM=true
    ...(process.env.INCLUDING_DATA_BASE_SYSTEM === 'true'
      ? [
          TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async () => {
              const dataSource = await initializeDatabase();
              return {
                ...dataSource.options,
                autoLoadEntities: true,
                retryAttempts: 5,
                retryDelay: 3000,
                synchronize: process.env.NODE_ENV !== "production",
                logging: process.env.DB_LOGGING === "true",
              };
            },
          }),
        ]
      : []),

    /**
     * Módulos Integrator de la aplicación
     */
    CqrsModule,
    HorizontalModule,
    IntegratorModule,
    CatalogClientModule,
        IntegrationAuthSchemeModule,
    IntegrationCredentialModule,
    IntegrationEndpointModule,
    IntegrationProviderModule,
    IntegrationRuntimePolicyModule,
    IntegrationStatusModule,    
    /**
     * Módulo Logger de la aplicación
     */
    LoggingModule,

    // GraphQL solo si GRAPHQL_ENABLED=true
    ...(process.env.GRAPHQL_ENABLED === 'true'
      ? [
          GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            buildSchemaOptions: {
              dateScalarMode: "timestamp",
            },
            resolvers: { JSON: GraphQLJSON },
          }),
        ]
      : []),
  ],

  /**
   * Controladores de Integrator
   *
   * Registro de controladores a nivel de aplicación.
   */
  controllers: [
  //No se recomienda habilitar los controladores si ya fueron declarados en el módulo: IntegratorModule
  /*
  
  IntegratorCommandController, 
  IntegratorQueryController
  
  */
  ],

  /**
   * Proveedores (Servicios, Repositorios, etc.) de Integrator
   *
   * Registro de servicios globales y configuración de inyección de dependencias.
   */
  providers: [
    // Configuración de Base de datos
    ...(process.env.INCLUDING_DATA_BASE_SYSTEM === 'true'
      ? [
          {
            provide: DataSource,
            useValue: AppDataSource,
          },
        ]
      : []),
    // Se importan los servicios del módulo
    IntegratorCommandService,
    IntegratorQueryService,
    LoggerService
  ],

  /**
   * Exportaciones de módulos y servicios
   *
   * Hace disponibles módulos y servicios para otros módulos que importen este módulo.
   */
  exports: [IntegratorCommandService, IntegratorQueryService,LoggerService],
})
export class IntegratorAppModule implements OnModuleInit {
  /**
   * Constructor del módulo principal
   * @param dataSource Instancia inyectada del DataSource
   * @param translocoService Servicio para manejo de idiomas
   */
  constructor(
    private moduleRef: ModuleRef,
    @Optional() @Inject(DataSource) private readonly dataSource?: DataSource
  ) {
    if (process.env.INCLUDING_DATA_BASE_SYSTEM === 'true') {
      this.checkDatabaseConnection();
    }
    this.setupLanguageChangeHandling();
    this.onModuleInit();
  }
  onModuleInit() {
    //Inicializar servicios del microservicio
    ServiceRegistry.getInstance().setModuleRef(this.moduleRef);
    ServiceRegistry.getInstance().registryAll([
      IntegratorCommandService,
      IntegratorQueryService,
      IntegrationAuthSchemeCommandService,
      IntegrationAuthSchemeQueryService,
      IntegrationCredentialCommandService,
      IntegrationCredentialQueryService,
      IntegrationEndpointCommandService,
      IntegrationEndpointQueryService,
      IntegrationProviderCommandService,
      IntegrationProviderQueryService,
      IntegrationRuntimePolicyCommandService,
      IntegrationRuntimePolicyQueryService,
      IntegrationStatusCommandService,
      IntegrationStatusQueryService,    
    ]);
    const loggerService = ServiceRegistry.getInstance().get(
      "LoggerService"
    ) as LoggerService;
    if (loggerService) 
    loggerService.log(ServiceRegistry.getInstance());
  }
  /**
   * Verifica la conexión a la base de datos al iniciar
   *
   * Realiza una consulta simple para confirmar que la conexión está activa.
   * Termina la aplicación si no puede establecer conexión.
   */
  private async checkDatabaseConnection() {
    try {
      if (!this.dataSource) return;
      await this.dataSource.query("SELECT 1");
      logger.log("✅ Conexión a la base de datos verificada correctamente");
    } catch (error) {
      logger.error(
        "❌ Error crítico: No se pudo conectar a la base de datos",
        error
      );
      process.exit(1); // Termina la aplicación con código de error
    }
  }

  /**
   * Configura el manejo de cambios de idioma
   *
   * Suscribe a eventos de cambio de idioma para mantener consistencia.
   */
  private setupLanguageChangeHandling() {}
}


