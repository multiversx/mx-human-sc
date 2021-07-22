import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - error_parameter_response
 * error_parameter_response
 */
@model({name: 'error_parameter_response'})
export class ErrorParameterResponse {
  constructor(data?: Partial<ErrorParameterResponse>) {
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

  /**
   *
   */
  @property({jsonSchema: {
  type: 'string',
}})
  parameter_name?: string;

}

export interface ErrorParameterResponseRelations {
  // describe navigational properties here
}

export type ErrorParameterResponseWithRelations = ErrorParameterResponse & ErrorParameterResponseRelations;


