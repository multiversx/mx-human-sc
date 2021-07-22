import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - polling_url_response
 * polling_url_response
 */
@model({name: 'polling_url_response'})
export class PollingUrlResponse {
  constructor(data?: Partial<PollingUrlResponse>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({jsonSchema: {
  type: 'string',
}})
  polling_url?: string;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'integer',
}})
  polling_policy_seconds?: number;

}

export interface PollingUrlResponseRelations {
  // describe navigational properties here
}

export type PollingUrlResponseWithRelations = PollingUrlResponse & PollingUrlResponseRelations;


