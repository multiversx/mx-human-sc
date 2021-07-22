import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - add_job_trusted_handlers_body
 * add_job_trusted_handlers_body
 */
@model({name: 'add_job_trusted_handlers_body'})
export class AddJobTrustedHandlersBody {
  constructor(data?: Partial<AddJobTrustedHandlersBody>) {
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
  @property.array(String, {jsonSchema: {
  type: 'array',
  items: {
    type: 'string',
  },
}})
  handlers?: string[];

}

export interface AddJobTrustedHandlersBodyRelations {
  // describe navigational properties here
}

export type AddJobTrustedHandlersBodyWithRelations = AddJobTrustedHandlersBody & AddJobTrustedHandlersBodyRelations;


