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


import { BaseEvent } from './base.event';
import { IntegratorCreatedEvent } from './integratorcreated.event';
import { IntegratorUpdatedEvent } from './integratorupdated.event';
import { IntegratorDeletedEvent } from './integratordeleted.event';
import { IntegratorConfiguredEvent } from './integratorconfigured.event';
import { IntegratorActivatedEvent } from './integratoractivated.event';
import { IntegratorDegradedEvent } from './integratordegraded.event';
import { IntegratorSuspendedEvent } from './integratorsuspended.event';
import { IntegratorRevokedEvent } from './integratorrevoked.event';

export type RegisteredEventClass<T extends BaseEvent = BaseEvent> = new (
  aggregateId: string,
  payload: any
) => T;

export interface RegisteredEventDefinition<T extends BaseEvent = BaseEvent> {
  topic: string;
  eventName: string;
  version: string;
  eventClass: RegisteredEventClass<T>;
  retryTopic: string;
  dlqTopic: string;
  maxRetries: number;
  replayable: boolean;
}

const createEventDefinition = <T extends BaseEvent>(
  topic: string,
  eventClass: RegisteredEventClass<T>,
  overrides?: Partial<Omit<RegisteredEventDefinition<T>, 'topic' | 'eventName' | 'eventClass'>>,
): RegisteredEventDefinition<T> => ({
  topic,
  eventName: eventClass.name,
  version: overrides?.version ?? '1.0.0',
  eventClass,
  retryTopic: overrides?.retryTopic ?? topic + '-retry',
  dlqTopic: overrides?.dlqTopic ?? topic + '-dlq',
  maxRetries: overrides?.maxRetries ?? 3,
  replayable: overrides?.replayable ?? true,
});

const EVENT_DEFINITION_OVERRIDES: Partial<Record<string, Partial<Omit<RegisteredEventDefinition, 'topic' | 'eventName' | 'eventClass'>>>> = {
  'integrator-created': {
    version: '1.0.0',
    maxRetries: 5,
    replayable: true,
  },
  'integrator-configured': {
    version: '1.0.0',
    maxRetries: 5,
    replayable: true,
  },
  'integrator-activated': {
    version: '1.0.0',
    maxRetries: 5,
    replayable: true,
  },
  'integrator-degraded': {
    version: '1.0.0',
    maxRetries: 5,
    replayable: true,
  },
  'integrator-suspended': {
    version: '1.0.0',
    maxRetries: 5,
    replayable: true,
  },
  'integrator-revoked': {
    version: '1.0.0',
    maxRetries: 5,
    replayable: true,
  },
};

export const EVENT_DEFINITIONS: Record<string, RegisteredEventDefinition> = {
  'integrator-created': createEventDefinition('integrator-created', IntegratorCreatedEvent, EVENT_DEFINITION_OVERRIDES['integrator-created']),
  'integrator-updated': createEventDefinition('integrator-updated', IntegratorUpdatedEvent, EVENT_DEFINITION_OVERRIDES['integrator-updated']),
  'integrator-deleted': createEventDefinition('integrator-deleted', IntegratorDeletedEvent, EVENT_DEFINITION_OVERRIDES['integrator-deleted']),
  'integrator-configured': createEventDefinition('integrator-configured', IntegratorConfiguredEvent, EVENT_DEFINITION_OVERRIDES['integrator-configured']),
  'integrator-activated': createEventDefinition('integrator-activated', IntegratorActivatedEvent, EVENT_DEFINITION_OVERRIDES['integrator-activated']),
  'integrator-degraded': createEventDefinition('integrator-degraded', IntegratorDegradedEvent, EVENT_DEFINITION_OVERRIDES['integrator-degraded']),
  'integrator-suspended': createEventDefinition('integrator-suspended', IntegratorSuspendedEvent, EVENT_DEFINITION_OVERRIDES['integrator-suspended']),
  'integrator-revoked': createEventDefinition('integrator-revoked', IntegratorRevokedEvent, EVENT_DEFINITION_OVERRIDES['integrator-revoked']),
};

export const EVENT_REGISTRY: Record<string, RegisteredEventClass> = Object.fromEntries(
  Object.values(EVENT_DEFINITIONS).map((definition) => [definition.topic, definition.eventClass])
);

export const EVENT_TOPICS = Object.values(EVENT_DEFINITIONS).map((definition) => definition.topic);
export const EVENT_RETRY_TOPICS = Object.values(EVENT_DEFINITIONS).map((definition) => definition.retryTopic);
export const EVENT_DLQ_TOPICS = Object.values(EVENT_DEFINITIONS).map((definition) => definition.dlqTopic);
export const EVENT_CONSUMER_TOPICS = Array.from(new Set([...EVENT_TOPICS, ...EVENT_RETRY_TOPICS]));
export const EVENT_ADMIN_TOPICS = Array.from(new Set([...EVENT_TOPICS, ...EVENT_RETRY_TOPICS, ...EVENT_DLQ_TOPICS]));

export const resolveEventDefinition = (candidate?: string): RegisteredEventDefinition | undefined => {
  if (!candidate) {
    return undefined;
  }

  if (EVENT_DEFINITIONS[candidate]) {
    return EVENT_DEFINITIONS[candidate];
  }

  return Object.values(EVENT_DEFINITIONS).find(
    (definition) =>
      definition.topic === candidate ||
      definition.retryTopic === candidate ||
      definition.dlqTopic === candidate ||
      definition.eventName === candidate,
  );
};
