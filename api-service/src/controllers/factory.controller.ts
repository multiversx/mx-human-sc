import {api, operation, param, requestBody} from '@loopback/rest';
import {JobListResponse} from '../models/job-list-response.model';
import {FactoryCreateBody} from '../models/factory-create-body.model';
import {PollingUrlResponse} from '../models/polling-url-response.model';
import {StringDataResponse} from '../models/string-data-response.model';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by Factory.
 *
 * Endpoint for Job factory management
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
export class FactoryController {
  constructor() {}

  /**
   * Receive the list of all jobs in the factory

   *
   * @param address Deployed Factory address
   * @param gasPayer address paying for the gas costs
   * @param gasPayerPrivate Private Key for the address paying for the gas costs
   * @returns List of all jobs deployed in the factory
   */
  @operation('get', '/factory', {
  tags: [
    'Factory',
  ],
  summary: 'Returns addresses of all jobs deployed in the factory',
  description: 'Receive the list of all jobs in the factory\n',
  operationId: 'get_factory',
  parameters: [
    {
      name: 'address',
      in: 'query',
      description: 'Deployed Factory address',
      required: true,
      style: 'form',
      explode: true,
      schema: {
        type: 'string',
      },
    },
    {
      name: 'gasPayer',
      in: 'query',
      description: 'address paying for the gas costs',
      required: true,
      style: 'form',
      explode: true,
      schema: {
        type: 'string',
      },
    },
    {
      name: 'gasPayerPrivate',
      in: 'query',
      description: 'Private Key for the address paying for the gas costs',
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
      description: 'List of all jobs deployed in the factory',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/job_list_response',
          },
        },
      },
    },
    '400': {
      description: 'invalid input parameter',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/error_parameter_response',
          },
        },
      },
    },
    '404': {
      description: 'Address does not exist',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/error_notexist_response',
          },
        },
      },
    },
  },
  'x-openapi-router-controller': 'human_api.controllers.factory_controller',
})
  async getFactory(@param({
  name: 'address',
  in: 'query',
  description: 'Deployed Factory address',
  required: true,
  style: 'form',
  explode: true,
  schema: {
    type: 'string',
  },
}) address: string, @param({
  name: 'gasPayer',
  in: 'query',
  description: 'address paying for the gas costs',
  required: true,
  style: 'form',
  explode: true,
  schema: {
    type: 'string',
  },
}) gasPayer: string, @param({
  name: 'gasPayerPrivate',
  in: 'query',
  description: 'Private Key for the address paying for the gas costs',
  required: true,
  style: 'form',
  explode: true,
  schema: {
    type: 'string',
  },
}) gasPayerPrivate: string): Promise<JobListResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Creates a new factory and returns the address
   *
   * @param _requestBody
   * @returns Launched address of the factory
   */
  @operation('post', '/factory', {
  tags: [
    'Factory',
  ],
  summary: 'Creates a new factory and returns the address',
  description: 'Creates a new factory and returns the address',
  operationId: 'new_factory',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/factory_create_body',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Launched address of the factory',
      content: {
        'application/json': {
          schema: {
            oneOf: [
              {
                $ref: '#/components/schemas/polling_url_response',
              },
              {
                $ref: '#/components/schemas/string_data_response',
              },
            ],
          },
        },
      },
    },
    '400': {
      description: 'invalid input parameter',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/error_parameter_response',
          },
        },
      },
    },
    '500': {
      description: 'Could not create factory',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/error_notcreate_response',
          },
        },
      },
    },
  },
  'x-openapi-router-controller': 'human_api.controllers.factory_controller',
})
  async newFactory(@requestBody({
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/factory_create_body',
      },
    },
  },
}) _requestBody: FactoryCreateBody): Promise<PollingUrlResponse | StringDataResponse> {
    throw new Error('Not implemented');
  }

}

