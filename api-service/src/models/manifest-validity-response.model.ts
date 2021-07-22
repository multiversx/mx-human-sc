import {model, property} from '@loopback/repository';
import {ErrorParameterResponse} from './error-parameter-response.model';

/**
 * The model class is generated from OpenAPI schema - manifest_validity_response
 * manifest_validity_response
 */
@model({name: 'manifest_validity_response'})
export class ManifestValidityResponse {
  constructor(data?: Partial<ManifestValidityResponse>) {
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
  valid?: boolean;

  /**
   *
   */
  @property.array(ErrorParameterResponse, {jsonSchema: {
  type: 'array',
  items: {
    $ref: '#/components/schemas/error_parameter_response',
  },
}})
  errors?: ErrorParameterResponse[];

}

export interface ManifestValidityResponseRelations {
  // describe navigational properties here
}

export type ManifestValidityResponseWithRelations = ManifestValidityResponse & ManifestValidityResponseRelations;


