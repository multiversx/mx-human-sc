import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - store_job_intermediate_results_body
 * store_job_intermediate_results_body
 */
@model({name: 'store_job_intermediate_results_body'})
export class StoreJobIntermediateResultsBody {
  constructor(data?: Partial<StoreJobIntermediateResultsBody>) {
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
  resultsUrl?: string;

}

export interface StoreJobIntermediateResultsBodyRelations {
  // describe navigational properties here
}

export type StoreJobIntermediateResultsBodyWithRelations = StoreJobIntermediateResultsBody & StoreJobIntermediateResultsBodyRelations;


