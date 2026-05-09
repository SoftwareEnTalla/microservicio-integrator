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
  IntegratorCreatedEvent,
  IntegratorUpdatedEvent,
  IntegratorDeletedEvent,
  IntegratorConfiguredEvent,
  IntegratorActivatedEvent,
  IntegratorDegradedEvent,
  IntegratorSuspendedEvent,
  IntegratorRevokedEvent,
} from '../events/exporting.event';
import {
  SagaIntegratorFailedEvent
} from '../events/integrator-failed.event';
import {
  CreateIntegratorCommand,
  UpdateIntegratorCommand,
  DeleteIntegratorCommand
} from '../commands/exporting.command';

//Logger - Codetrace
import { LogExecutionTime } from 'src/common/logger/loggers.functions';
import { LoggerClient } from 'src/common/logger/logger.client';
import { logger } from '@core/logs/logger';

@Injectable()
export class IntegratorCrudSaga {
  private readonly logger = new Logger(IntegratorCrudSaga.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus
  ) {}

  // Reacción a evento de creación
  @Saga()
  onIntegratorCreated = ($events: Observable<IntegratorCreatedEvent>) => {
    return $events.pipe(
      ofType(IntegratorCreatedEvent),
      tap(event => {
        this.logger.log(`Saga iniciada para creación de Integrator: ${event.aggregateId}`);
        void this.handleIntegratorCreated(event);
      }),
      map(() => null)
    );
  };

  // Reacción a evento de actualización
  @Saga()
  onIntegratorUpdated = ($events: Observable<IntegratorUpdatedEvent>) => {
    return $events.pipe(
      ofType(IntegratorUpdatedEvent),
      tap(event => {
        this.logger.log(`Saga iniciada para actualización de Integrator: ${event.aggregateId}`);
        void this.handleIntegratorUpdated(event);
      }),
      map(() => null)
    );
  };

  // Reacción a evento de eliminación
  @Saga()
  onIntegratorDeleted = ($events: Observable<IntegratorDeletedEvent>) => {
    return $events.pipe(
      ofType(IntegratorDeletedEvent),
      tap(event => {
        this.logger.log(`Saga iniciada para eliminación de Integrator: ${event.aggregateId}`);
        void this.handleIntegratorDeleted(event);
      }),
      map(() => null)
    );
  };

  @Saga()
  onIntegratorConfigured = ($events: Observable<IntegratorConfiguredEvent>) => {
    return $events.pipe(
      ofType(IntegratorConfiguredEvent),
      tap(event => {
        this.logger.log(`Saga iniciada para evento de dominio IntegratorConfigured: ${event.aggregateId}`);
      }),
      map(() => null)
    );
  };

  @Saga()
  onIntegratorActivated = ($events: Observable<IntegratorActivatedEvent>) => {
    return $events.pipe(
      ofType(IntegratorActivatedEvent),
      tap(event => {
        this.logger.log(`Saga iniciada para evento de dominio IntegratorActivated: ${event.aggregateId}`);
      }),
      map(() => null)
    );
  };

  @Saga()
  onIntegratorDegraded = ($events: Observable<IntegratorDegradedEvent>) => {
    return $events.pipe(
      ofType(IntegratorDegradedEvent),
      tap(event => {
        this.logger.log(`Saga iniciada para evento de dominio IntegratorDegraded: ${event.aggregateId}`);
      }),
      map(() => null)
    );
  };

  @Saga()
  onIntegratorSuspended = ($events: Observable<IntegratorSuspendedEvent>) => {
    return $events.pipe(
      ofType(IntegratorSuspendedEvent),
      tap(event => {
        this.logger.log(`Saga iniciada para evento de dominio IntegratorSuspended: ${event.aggregateId}`);
      }),
      map(() => null)
    );
  };

  @Saga()
  onIntegratorRevoked = ($events: Observable<IntegratorRevokedEvent>) => {
    return $events.pipe(
      ofType(IntegratorRevokedEvent),
      tap(event => {
        this.logger.log(`Saga iniciada para evento de dominio IntegratorRevoked: ${event.aggregateId}`);
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
      .registerClient(IntegratorCrudSaga.name)
      .get(IntegratorCrudSaga.name),
  })
  private async handleIntegratorCreated(event: IntegratorCreatedEvent): Promise<void> {
    try {
      this.logger.log(`Saga Integrator Created completada: ${event.aggregateId}`);
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
      .registerClient(IntegratorCrudSaga.name)
      .get(IntegratorCrudSaga.name),
  })
  private async handleIntegratorUpdated(event: IntegratorUpdatedEvent): Promise<void> {
    try {
      this.logger.log(`Saga Integrator Updated completada: ${event.aggregateId}`);
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
      .registerClient(IntegratorCrudSaga.name)
      .get(IntegratorCrudSaga.name),
  })
  private async handleIntegratorDeleted(event: IntegratorDeletedEvent): Promise<void> {
    try {
      this.logger.log(`Saga Integrator Deleted completada: ${event.aggregateId}`);
      // Lógica post-eliminación (ej: limpiar relaciones)
    } catch (error: any) {
      this.handleSagaError(error, event);
    }
  }

  // Método para manejo de errores en sagas
  private handleSagaError(error: Error, event: any) {
    this.logger.error(`Error en saga para evento ${event.constructor.name}: ${error.message}`);
    this.eventBus.publish(new SagaIntegratorFailedEvent( error,event));
  }
}
