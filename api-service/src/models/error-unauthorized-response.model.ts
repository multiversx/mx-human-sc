import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - error_unauthorized_response
 * error_unauthorized_response
 */
@model({name: 'error_unauthorized_response'})
export class ErrorUnauthorizedResponse {
  constructor(data?: Partial<ErrorUnauthorizedResponse>) {
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
  error?: string;

}

export interface ErrorUnauthorizedResponseRelations {
  // describe navigational properties here
}

export type ErrorUnauthorizedResponseWithRelations = ErrorUnauthorizedResponse & ErrorUnauthorizedResponseRelations;


