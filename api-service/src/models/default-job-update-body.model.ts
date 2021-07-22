import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - default_job_update_body
 * default_job_update_body
 */
@model({name: 'default_job_update_body'})
export class DefaultJobUpdateBody {
  constructor(data?: Partial<DefaultJobUpdateBody>) {
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
  address?: string;

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

export interface DefaultJobUpdateBodyRelations {
  // describe navigational properties here
}

export type DefaultJobUpdateBodyWithRelations = DefaultJobUpdateBody & DefaultJobUpdateBodyRelations;


