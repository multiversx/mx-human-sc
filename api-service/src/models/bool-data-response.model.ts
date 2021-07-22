import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - bool_data_response
 * bool_data_response
 */
@model({name: 'bool_data_response'})
export class BoolDataResponse {
  constructor(data?: Partial<BoolDataResponse>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({jsonSchema: {
  type: 'boolean',
}})
  success?: boolean;

}

export interface BoolDataResponseRelations {
  // describe navigational properties here
}

export type BoolDataResponseWithRelations = BoolDataResponse & BoolDataResponseRelations;


