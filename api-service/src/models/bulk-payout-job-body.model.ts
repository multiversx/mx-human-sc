import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - bulk_payout_job_body
 * bulk_payout_job_body
 */
@model({name: 'bulk_payout_job_body'})
export class BulkPayoutJobBody {
  constructor(data?: Partial<BulkPayoutJobBody>) {
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

  /**
   *
   */
  @property({jsonSchema: {
  type: 'string',
}})
  payoutsUrl?: string;

}

export interface BulkPayoutJobBodyRelations {
  // describe navigational properties here
}

export type BulkPayoutJobBodyWithRelations = BulkPayoutJobBody & BulkPayoutJobBodyRelations;


