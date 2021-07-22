import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - job_list_response
 * job_list_response
 */
@model({name: 'job_list_response'})
export class JobListResponse {
  constructor(data?: Partial<JobListResponse>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   *
   */
  @property.array(String, {jsonSchema: {
  type: 'array',
  items: {
    type: 'string',
  },
}})
  jobs?: string[];

}

export interface JobListResponseRelations {
  // describe navigational properties here
}

export type JobListResponseWithRelations = JobListResponse & JobListResponseRelations;


