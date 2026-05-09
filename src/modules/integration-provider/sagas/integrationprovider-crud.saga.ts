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


import { Injectable, Logger } from '@nestjs/common';
import { Saga, CommandBus, EventBus, ofType } from '@nestjs/cqrs';
import { Observable, map, tap } from 'rxjs';
import {
  IntegrationProviderCreatedEvent,
  IntegrationProviderUpdatedEvent,
  IntegrationProviderDeletedEvent,

} from '../events/exporting.event';
import {
  SagaIntegrationProviderFailedEvent
} from '../events/integrationprovider-failed.event';
import {
  CreateIntegrationProviderCommand,
  UpdateIntegrationProviderCommand,
  DeleteIntegrationProviderCommand
} from '../commands/exporting.command';

//Logger - Codetrace
import { LogExecutionTime } from 'src/common/logger/loggers.functions';
import { LoggerClient } from 'src/common/logger/logger.client';
import { logger } from '@core/logs/logger';

@Injectable()
export class IntegrationProviderCrudSaga {
  private readonly logger = new Logger(IntegrationProviderCrudSaga.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus
  ) {}

  // Reacción a evento de creación
  @Saga()
  onIntegrationProviderCreated = ($events: Observable<IntegrationProviderCreatedEvent>) => {
    return $events.pipe(
      ofType(IntegrationProviderCreatedEvent),
      tap(event => {
        this.logger.log(`Saga iniciada para creación de IntegrationProvider: ${event.aggregateId}`);
        void this.handleIntegrationProviderCreated(event);
      }),
      map(() => null)
    );
  };

  // Reacción a evento de actualización
  @Saga()
  onIntegrationProviderUpdated = ($events: Observable<IntegrationProviderUpdatedEvent>) => {
    return $events.pipe(
      ofType(IntegrationProviderUpdatedEvent),
      tap(event => {
        this.logger.log(`Saga iniciada para actualización de IntegrationProvider: ${event.aggregateId}`);
        void this.handleIntegrationProviderUpdated(event);
      }),
      map(() => null)
    );
  };

  // Reacción a evento de eliminación
  @Saga()
  onIntegrationProviderDeleted = ($events: Observable<IntegrationProviderDeletedEvent>) => {
    return $events.pipe(
      ofType(IntegrationProviderDeletedEvent),
      tap(event => {
        this.logger.log(`Saga iniciada para eliminación de IntegrationProvider: ${event.aggregateId}`);
        void this.handleIntegrationProviderDeleted(event);
      }),
      map(() => null)
    );
  };


  @LogExecutionTime({
    layer: 'saga',
    callback: async (logData, client) => {
      try {
        logger.info('Codetrace saga event:', [logData, client]);
        return await client.send(logData);
      } catch (error) {
        logger.info('Error enviando traza de saga:', logData);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(IntegrationProviderCrudSaga.name)
      .get(IntegrationProviderCrudSaga.name),
  })
  private async handleIntegrationProviderCreated(event: IntegrationProviderCreatedEvent): Promise<void> {
    try {
      this.logger.log(`Saga IntegrationProvider Created completada: ${event.aggregateId}`);
      // Lógica post-creación (ej: enviar notificación, ejecutar comandos adicionales)
    } catch (error: any) {
      this.handleSagaError(error, event);
    }
  }

  @LogExecutionTime({
    layer: 'saga',
    callback: async (logData, client) => {
      try {
        logger.info('Codetrace saga event:', [logData, client]);
        return await client.send(logData);
      } catch (error) {
        logger.info('Error enviando traza de saga:', logData);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(IntegrationProviderCrudSaga.name)
      .get(IntegrationProviderCrudSaga.name),
  })
  private async handleIntegrationProviderUpdated(event: IntegrationProviderUpdatedEvent): Promise<void> {
    try {
      this.logger.log(`Saga IntegrationProvider Updated completada: ${event.aggregateId}`);
      // Lógica post-actualización (ej: actualizar caché)
    } catch (error: any) {
      this.handleSagaError(error, event);
    }
  }

  @LogExecutionTime({
    layer: 'saga',
    callback: async (logData, client) => {
      try {
        logger.info('Codetrace saga event:', [logData, client]);
        return await client.send(logData);
      } catch (error) {
        logger.info('Error enviando traza de saga:', logData);
        throw error;
      }
    },
    client: LoggerClient.getInstance()
      .registerClient(IntegrationProviderCrudSaga.name)
      .get(IntegrationProviderCrudSaga.name),
  })
  private async handleIntegrationProviderDeleted(event: IntegrationProviderDeletedEvent): Promise<void> {
    try {
      this.logger.log(`Saga IntegrationProvider Deleted completada: ${event.aggregateId}`);
      // Lógica post-eliminación (ej: limpiar relaciones)
    } catch (error: any) {
      this.handleSagaError(error, event);
    }
  }

  // Método para manejo de errores en sagas
  private handleSagaError(error: Error, event: any) {
    this.logger.error(`Error en saga para evento ${event.constructor.name}: ${error.message}`);
    this.eventBus.publish(new SagaIntegrationProviderFailedEvent( error,event));
  }
}
