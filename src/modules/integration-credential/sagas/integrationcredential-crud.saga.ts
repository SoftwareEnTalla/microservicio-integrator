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


import { Injectable, Logger, Optional } from '@nestjs/common';
import { Saga, CommandBus, EventBus, ofType } from '@nestjs/cqrs';
import { Observable, map, tap } from 'rxjs';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  IntegrationCredentialCreatedEvent,
  IntegrationCredentialUpdatedEvent,
  IntegrationCredentialDeletedEvent,

} from '../events/exporting.event';
import {
  SagaIntegrationCredentialFailedEvent
} from '../events/integrationcredential-failed.event';
import {
  CreateIntegrationCredentialCommand,
  UpdateIntegrationCredentialCommand,
  DeleteIntegrationCredentialCommand
} from '../commands/exporting.command';

//Logger - Codetrace
import { LogExecutionTime } from 'src/common/logger/loggers.functions';
import { LoggerClient } from 'src/common/logger/logger.client';
import { logger } from '@core/logs/logger';
import { IntegrationStatus } from '../../integration-status/entities/integration-status.entity';

@Injectable()
export class IntegrationCredentialCrudSaga {
  private readonly logger = new Logger(IntegrationCredentialCrudSaga.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    @Optional() @InjectDataSource() private readonly dataSource: DataSource | undefined,
  ) {}

  // Reacción a evento de creación
  @Saga()
  onIntegrationCredentialCreated = ($events: Observable<IntegrationCredentialCreatedEvent>) => {
    return $events.pipe(
      ofType(IntegrationCredentialCreatedEvent),
      tap(event => {
        this.logger.log(`Saga iniciada para creación de IntegrationCredential: ${event.aggregateId}`);
        void this.handleIntegrationCredentialCreated(event);
      }),
      map(() => null)
    );
  };

  // Reacción a evento de actualización
  @Saga()
  onIntegrationCredentialUpdated = ($events: Observable<IntegrationCredentialUpdatedEvent>) => {
    return $events.pipe(
      ofType(IntegrationCredentialUpdatedEvent),
      tap(event => {
        this.logger.log(`Saga iniciada para actualización de IntegrationCredential: ${event.aggregateId}`);
        void this.handleIntegrationCredentialUpdated(event);
      }),
      map(() => null)
    );
  };

  // Reacción a evento de eliminación
  @Saga()
  onIntegrationCredentialDeleted = ($events: Observable<IntegrationCredentialDeletedEvent>) => {
    return $events.pipe(
      ofType(IntegrationCredentialDeletedEvent),
      tap(event => {
        this.logger.log(`Saga iniciada para eliminación de IntegrationCredential: ${event.aggregateId}`);
        void this.handleIntegrationCredentialDeleted(event);
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
      .registerClient(IntegrationCredentialCrudSaga.name)
      .get(IntegrationCredentialCrudSaga.name),
  })
  private async handleIntegrationCredentialCreated(event: IntegrationCredentialCreatedEvent): Promise<void> {
    try {
      await this.upsertOperationalStatus(event, false);
      this.logger.log(`Saga IntegrationCredential Created completada: ${event.aggregateId}`);
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
      .registerClient(IntegrationCredentialCrudSaga.name)
      .get(IntegrationCredentialCrudSaga.name),
  })
  private async handleIntegrationCredentialUpdated(event: IntegrationCredentialUpdatedEvent): Promise<void> {
    try {
      await this.upsertOperationalStatus(event, false);
      this.logger.log(`Saga IntegrationCredential Updated completada: ${event.aggregateId}`);
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
      .registerClient(IntegrationCredentialCrudSaga.name)
      .get(IntegrationCredentialCrudSaga.name),
  })
  private async handleIntegrationCredentialDeleted(event: IntegrationCredentialDeletedEvent): Promise<void> {
    try {
      await this.upsertOperationalStatus(event, true);
      this.logger.log(`Saga IntegrationCredential Deleted completada: ${event.aggregateId}`);
      // Lógica post-eliminación (ej: limpiar relaciones)
    } catch (error: any) {
      this.handleSagaError(error, event);
    }
  }

  // Método para manejo de errores en sagas
  private handleSagaError(error: Error, event: any) {
    this.logger.error(`Error en saga para evento ${event.constructor.name}: ${error.message}`);
    this.eventBus.publish(new SagaIntegrationCredentialFailedEvent( error,event));
  }

  private async upsertOperationalStatus(
    event: IntegrationCredentialCreatedEvent | IntegrationCredentialUpdatedEvent | IntegrationCredentialDeletedEvent,
    deleted: boolean,
  ): Promise<void> {
    const dataSource = this.resolveDataSource();
    if (!dataSource) {
      this.logger.warn(`Saga IntegrationCredential sin DataSource para sincronizar IntegrationStatus de ${event.aggregateId}`);
      return;
    }

    const snapshot = this.extractSnapshot(event);
    const derived = this.deriveCredentialHealth(snapshot, deleted);
    const repository = dataSource.getRepository(IntegrationStatus);
    const code = this.buildStatusCode(event.aggregateId);
    const existing = await repository.findOne({ where: { code } as any });

    await repository.save(
      repository.create({
        ...(existing as any || {}),
        name: `Integration credential ${String(snapshot?.alias || snapshot?.name || event.aggregateId).slice(0, 80)}`,
        description: `Estado operativo derivado por saga para la credencial ${event.aggregateId}: ${derived.displayName}.`,
        code,
        displayName: derived.displayName,
        isTerminal: derived.isTerminal,
        isOperational: derived.isOperational,
        severity: derived.severity,
        createdBy: (event as any)?.payload?.metadata?.initiatedBy || 'system',
        isActive: true,
      } as any),
    );
  }

  private extractSnapshot(
    event: IntegrationCredentialCreatedEvent | IntegrationCredentialUpdatedEvent | IntegrationCredentialDeletedEvent,
  ): Record<string, any> {
    return (event as any)?.payload?.instance || {};
  }

  private deriveCredentialHealth(snapshot: Record<string, any>, deleted: boolean): {
    displayName: string;
    isOperational: boolean;
    isTerminal: boolean;
    severity: string;
  } {
    const rawStatus = String(snapshot?.status || '').toUpperCase();
    const hasSecretMaterial = [snapshot?.apiKey, snapshot?.clientSecret, snapshot?.accessToken, snapshot?.webhookSecret]
      .some((value) => typeof value === 'string' && value.trim().length > 0);
    const expiresAt = snapshot?.expiresAt ? new Date(snapshot.expiresAt) : null;
    const isExpired = Boolean(expiresAt && !Number.isNaN(expiresAt.getTime()) && expiresAt.getTime() < Date.now());

    if (deleted) {
      return {
        displayName: 'DELETED',
        isOperational: false,
        isTerminal: true,
        severity: 'INFO',
      };
    }
    if (rawStatus === 'ACTIVE' && hasSecretMaterial && !isExpired) {
      return {
        displayName: 'ACTIVE_OPERATIONAL',
        isOperational: true,
        isTerminal: false,
        severity: 'INFO',
      };
    }
    if (rawStatus === 'ACTIVE' && (!hasSecretMaterial || isExpired)) {
      return {
        displayName: 'ACTIVE_DEGRADED',
        isOperational: false,
        isTerminal: false,
        severity: 'HIGH',
      };
    }
    if (isExpired || rawStatus === 'EXPIRED') {
      return {
        displayName: 'EXPIRED',
        isOperational: false,
        isTerminal: true,
        severity: 'HIGH',
      };
    }
    if (['DISABLED', 'INACTIVE', 'REVOKED'].includes(rawStatus)) {
      return {
        displayName: rawStatus,
        isOperational: false,
        isTerminal: false,
        severity: 'MEDIUM',
      };
    }

    return {
      displayName: 'PENDING_CONFIGURATION',
      isOperational: false,
      isTerminal: false,
      severity: 'MEDIUM',
    };
  }

  private buildStatusCode(aggregateId: string): string {
    const compactId = String(aggregateId || '').replace(/-/g, '');
    return `CRED_${compactId.slice(0, 12)}_${compactId.slice(-12)}`;
  }

  private resolveDataSource(): DataSource | null {
    if (this.dataSource?.isInitialized) {
      return this.dataSource;
    }

    return null;
  }
}
