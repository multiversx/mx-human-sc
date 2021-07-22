import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - error_notexist_response
 * error_notexist_response
 */
@model({name: 'error_notexist_response'})
export class ErrorNotexistResponse {
  constructor(data?: Partial<ErrorNotexistResponse>) {
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

export interface ErrorNotexistResponseRelations {
  // describe navigational properties here
}

export type ErrorNotexistResponseWithRelations = ErrorNotexistResponse & ErrorNotexistResponseRelations;


