import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - job_status_response
 * job_status_response
 */
@model({name: 'job_status_response'})
export class JobStatusResponse {
  constructor(data?: Partial<JobStatusResponse>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property({jsonSchema: {
  type: 'string',
  enum: [
    'Launched',
    'Pending',
    'Partial',
    'Paid',
    'Complete',
    'Cancelled',
  ],
}})
  status?: 'Launched' | 'Pending' | 'Partial' | 'Paid' | 'Complete' | 'Cancelled';

}

export interface JobStatusResponseRelations {
  // describe navigational properties here
}

export type JobStatusResponseWithRelations = JobStatusResponse & JobStatusResponseRelations;


