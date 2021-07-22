import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - factory_create_body
 * factory_create_body
 */
@model({name: 'factory_create_body'})
export class FactoryCreateBody {
  constructor(data?: Partial<FactoryCreateBody>) {
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
  gasPayer?: string;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'string',
}})
  gasPayerPrivate?: string;

}

export interface FactoryCreateBodyRelations {
  // describe navigational properties here
}

export type FactoryCreateBodyWithRelations = FactoryCreateBody & FactoryCreateBodyRelations;


