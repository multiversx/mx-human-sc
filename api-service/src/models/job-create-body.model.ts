import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - job_create_body
 * job_create_body
 */
@model({name: 'job_create_body'})
export class JobCreateBody {
  constructor(data?: Partial<JobCreateBody>) {
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
  factoryAddress?: string;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'string',
}})
  repOraclePub?: string;

  /**
   *
   */
  @property({jsonSchema: {
  type: 'string',
}})
  manifestUrl?: string;

}

export interface JobCreateBodyRelations {
  // describe navigational properties here
}

export type JobCreateBodyWithRelations = JobCreateBody & JobCreateBodyRelations;


