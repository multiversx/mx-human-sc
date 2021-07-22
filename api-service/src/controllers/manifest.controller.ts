import {api, operation, param, requestBody} from '@loopback/rest';
import {ManifestValidityResponse} from '../models/manifest-validity-response.model';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by Manifest.
 *
 * Endpoint for Manifest management
 */
@api({
  components: {
    schemas: {
      job_list_response: {
        type: 'object',
        properties: {
          jobs: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        example: {
          jobs: [
            11259375,
            11259375,
          ],
        },
      },
      factory_create_body: {
        type: 'object',
        properties: {
          gasPayer: {
            type: 'string',
          },
          gasPayerPrivate: {
            type: 'string',
          },
        },
      },
      default_job_update_body: {
        type: 'object',
        properties: {
          address: {
            type: 'string',
            example: '0x00000021312122121212',
          },
          gasPayer: {
            type: 'string',
          },
          gasPayerPrivate: {
            type: 'string',
          },
        },
      },
      manifest_validity_response: {
        type: 'object',
        properties: {
          valid: {
            type: 'boolean',
            example: false,
          },
          errors: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/error_parameter_response',
            },
          },
        },
        example: {
          valid: false,
          errors: [
            {
              parameter_name: 'gas_payer',
              error: 'Invalid parameter',
            },
            {
              parameter_name: 'gas_payer',
              error: 'Invalid parameter',
            },
          ],
        },
      },
      job_create_body: {
        type: 'object',
        properties: {
          gasPayer: {
            type: 'string',
            example: 0,
          },
          gasPayerPrivate: {
            type: 'string',
            example: 0,
          },
          factoryAddress: {
            type: 'string',
            example: 0,
          },
          repOraclePub: {
            type: 'string',
            example: '<reputation oracles public address> 0x0000000',
          },
          manifestUrl: {
            type: 'string',
            example: 'http://example.com/manifest.json',
          },
        },
      },
      store_job_intermediate_results_body: {
        type: 'object',
        properties: {
          gasPayer: {
            type: 'string',
            example: 0,
          },
          gasPayerPrivate: {
            type: 'string',
            example: 0,
          },
          address: {
            type: 'string',
            example: 0,
          },
          repOraclePub: {
            type: 'string',
            example: '<reputation oracles public address> 0x0000000',
          },
          resultsUrl: {
            type: 'string',
            example: 'http://example.com/results.json',
          },
        },
      },
      bulk_payout_job_body: {
        type: 'object',
        properties: {
          gasPayer: {
            type: 'string',
            example: 0,
          },
          gasPayerPrivate: {
            type: 'string',
            example: 0,
          },
          address: {
            type: 'string',
            example: 0,
          },
          repOraclePub: {
            type: 'string',
            example: '<reputation oracles public address> 0x0000000',
          },
          resultsUrl: {
            type: 'string',
            example: 'http://example.com/results.json',
          },
          payoutsUrl: {
            type: 'string',
            example: 'http://example.com/results.json',
          },
        },
      },
      add_job_trusted_handlers_body: {
        type: 'object',
        properties: {
          gasPayer: {
            type: 'string',
            example: 0,
          },
          gasPayerPrivate: {
            type: 'string',
            example: 0,
          },
          address: {
            type: 'string',
            example: 0,
          },
          handlers: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      job_status_response: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: [
              'Launched',
              'Pending',
              'Partial',
              'Paid',
              'Complete',
              'Cancelled',
            ],
          },
        },
        example: {
          status: 'Launched',
        },
      },
      string_data_response: {
        type: 'object',
        properties: {
          data: {
            type: 'string',
            example: 'data',
          },
        },
        example: {
          data: 'data',
        },
      },
      polling_url_response: {
        type: 'object',
        properties: {
          polling_url: {
            type: 'string',
            example: 'https://human-api.com/create/exchange_id/polling_id',
          },
          polling_policy_seconds: {
            type: 'integer',
            example: 500,
          },
        },
        example: {
          polling_url: 'https://human-api.com/create/exchange_id/polling_id',
          polling_policy_seconds: 300,
        },
      },
      int_data_response: {
        type: 'object',
        properties: {
          data: {
            type: 'integer',
            example: 110000,
          },
        },
        example: {
          data: 110000,
        },
      },
      bool_data_response: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
          },
        },
        example: {
          success: true,
        },
      },
      error_notcreate_response: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Could not create',
          },
        },
      },
      error_parameter_response: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Invalid parameter',
          },
          parameter_name: {
            type: 'string',
            example: 'gas_payer',
          },
        },
        example: {
          parameter_name: 'gas_payer',
          error: 'Invalid parameter',
        },
      },
      error_notexist_response: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'address / url does not exist',
          },
        },
      },
      error_unauthorized_response: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Unauthorized',
          },
        },
      },
    },
  },
  paths: {},
})
export class ManifestController {
  constructor() {}

  /**
   * Validates a manifest provided by a public URL

   *
   * @param manifestUrl Publicly available manifest URL
   * @returns Validation
   */
  @operation('get', '/manifest/validate', {
  tags: [
    'Manifest',
  ],
  summary: 'Validates a manifest provided by a public URL',
  description: 'Validates a manifest provided by a public URL\n',
  operationId: 'validate_manifest',
  parameters: [
    {
      name: 'manifestUrl',
      in: 'query',
      description: 'Publicly available manifest URL',
      required: true,
      style: 'form',
      explode: true,
      schema: {
        type: 'string',
      },
    },
  ],
  responses: {
    '200': {
      description: 'Validation',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/manifest_validity_response',
          },
        },
      },
    },
    '404': {
      description: 'URL does not exist',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/error_notexist_response',
          },
        },
      },
    },
  },
  'x-openapi-router-controller': 'human_api.controllers.manifest_controller',
})
  async validateManifest(@param({
  name: 'manifestUrl',
  in: 'query',
  description: 'Publicly available manifest URL',
  required: true,
  style: 'form',
  explode: true,
  schema: {
    type: 'string',
  },
}) manifestUrl: string): Promise<ManifestValidityResponse> {
    throw new Error('Not implemented');
  }

}

