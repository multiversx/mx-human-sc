import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - string_data_response
 * string_data_response
 */
@model({name: 'string_data_response'})
export class StringDataResponse {
  constructor(data?: Partial<StringDataResponse>) {
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
  data?: string;

}

export interface StringDataResponseRelations {
  // describe navigational properties here
}

export type StringDataResponseWithRelations = StringDataResponse & StringDataResponseRelations;


