import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - error_notcreate_response
 * error_notcreate_response
 */
@model({name: 'error_notcreate_response'})
export class ErrorNotcreateResponse {
  constructor(data?: Partial<ErrorNotcreateResponse>) {
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

export interface ErrorNotcreateResponseRelations {
  // describe navigational properties here
}

export type ErrorNotcreateResponseWithRelations = ErrorNotcreateResponse & ErrorNotcreateResponseRelations;


