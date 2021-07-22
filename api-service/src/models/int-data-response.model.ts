import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - int_data_response
 * int_data_response
 */
@model({name: 'int_data_response'})
export class IntDataResponse {
  constructor(data?: Partial<IntDataResponse>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({jsonSchema: {
  type: 'integer',
}})
  data?: number;

}

export interface IntDataResponseRelations {
  // describe navigational properties here
}

export type IntDataResponseWithRelations = IntDataResponse & IntDataResponseRelations;


