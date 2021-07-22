import {api, operation, param, requestBody} from '@loopback/rest';
import {JobCreateBody} from '../models/job-create-body.model';
import {PollingUrlResponse} from '../models/polling-url-response.model';
import {StringDataResponse} from '../models/string-data-response.model';
import {JobStatusResponse} from '../models/job-status-response.model';
import {IntDataResponse} from '../models/int-data-response.model';
import {DefaultJobUpdateBody} from '../models/default-job-update-body.model';
import {BoolDataResponse} from '../models/bool-data-response.model';
import {StoreJobIntermediateResultsBody} from '../models/store-job-intermediate-results-body.model';
import {BulkPayoutJobBody} from '../models/bulk-payout-job-body.model';
import {AddJobTrustedHandlersBody} from '../models/add-job-trusted-handlers-body.model';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by Jobs.
 *
 * Endpoint for all job management
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
export class JobsController {
  constructor() {}

  /**
   * Creates a new job and returns the address
   *
   * @param _requestBody
   * @returns Deployed address of the job
   */
  @operation('post', '/job', {
  tags: [
    'Jobs',
  ],
  summary: 'Creates a new Job and returns the address',
  description: 'Creates a new job and returns the address',
  operationId: 'new_job',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/job_create_body',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Deployed address of the job',
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
    '401': {
      description: 'invalid input parameter',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/error_parameter_response',
          },
        },
      },
    },
  },
  'x-openapi-router-controller': 'human_api.controllers.jobs_controller',
})
  async newJob(@requestBody({
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/job_create_body',
      },
    },
  },
}) _requestBody: JobCreateBody): Promise<PollingUrlResponse | StringDataResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Receive the address of the launcher of a given job address

   *
   * @param address Deployed Job address
   * @param gasPayer address paying for the gas costs
   * @param gasPayerPrivate Private Key for the address paying for the gas costs
   * @returns Launcher address of the job
   */
  @operation('get', '/job/launcher', {
  tags: [
    'Jobs',
  ],
  summary: 'Address of the launcher of a given job address',
  description: 'Receive the address of the launcher of a given job address\n',
  operationId: 'get_job_launcher',
  parameters: [
    {
      name: 'address',
      in: 'query',
      description: 'Deployed Job address',
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
      description: 'Launcher address of the job',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/string_data_response',
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
            $ref: '#/components/schemas/error_notcreate_response',
          },
        },
      },
    },
  },
  'x-openapi-router-controller': 'human_api.controllers.jobs_controller',
})
  async getJobLauncher(@param({
  name: 'address',
  in: 'query',
  description: 'Deployed Job address',
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
}) gasPayerPrivate: string): Promise<StringDataResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Receive the status of a given job address

   *
   * @param address Deployed Job address
   * @param gasPayer address paying for the gas costs
   * @param gasPayerPrivate Private Key for the address paying for the gas costs
   * @returns Status of the job
   */
  @operation('get', '/job/status', {
  tags: [
    'Jobs',
  ],
  summary: 'Status of a given job address',
  description: 'Receive the status of a given job address\n',
  operationId: 'get_job_status',
  parameters: [
    {
      name: 'address',
      in: 'query',
      description: 'Deployed Job address',
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
      description: 'Status of the job',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/job_status_response',
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
  'x-openapi-router-controller': 'human_api.controllers.jobs_controller',
})
  async getJobStatus(@param({
  name: 'address',
  in: 'query',
  description: 'Deployed Job address',
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
}) gasPayerPrivate: string): Promise<JobStatusResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Receive the Manifest URL of a given job address

   *
   * @param address Deployed Job address
   * @param gasPayer address paying for the gas costs
   * @param gasPayerPrivate Private Key for the address paying for the gas costs
   * @returns Manifest URL of the job
   */
  @operation('get', '/job/manifestUrl', {
  tags: [
    'Jobs',
  ],
  summary: 'Manifest URL of a given job address',
  description: 'Receive the Manifest URL of a given job address\n',
  operationId: 'get_job_manifest_url',
  parameters: [
    {
      name: 'address',
      in: 'query',
      description: 'Deployed Job address',
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
      description: 'Manifest URL of the job',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/string_data_response',
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
  'x-openapi-router-controller': 'human_api.controllers.jobs_controller',
})
  async getJobManifestUrl(@param({
  name: 'address',
  in: 'query',
  description: 'Deployed Job address',
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
}) gasPayerPrivate: string): Promise<StringDataResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Receive the Manifest Hash of a given job address

   *
   * @param address Deployed Job address
   * @param gasPayer address paying for the gas costs
   * @param gasPayerPrivate Private Key for the address paying for the gas costs
   * @returns Manifest Hash of the job
   */
  @operation('get', '/job/manifestHash', {
  tags: [
    'Jobs',
  ],
  summary: 'Manifest Hash of a given job address',
  description: 'Receive the Manifest Hash of a given job address\n',
  operationId: 'get_job_manifest_hash',
  parameters: [
    {
      name: 'address',
      in: 'query',
      description: 'Deployed Job address',
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
      description: 'Manifest Hash of the job',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/string_data_response',
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
  'x-openapi-router-controller': 'human_api.controllers.jobs_controller',
})
  async getJobManifestHash(@param({
  name: 'address',
  in: 'query',
  description: 'Deployed Job address',
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
}) gasPayerPrivate: string): Promise<StringDataResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Balance in HMT of a given job address

   *
   * @param address Deployed Job address
   * @param gasPayer address paying for the gas costs
   * @param gasPayerPrivate Private Key for the address paying for the gas costs
   * @returns Manifest Hash of the job
   */
  @operation('get', '/job/balance', {
  tags: [
    'Jobs',
  ],
  summary: 'Balance in HMT of a given job address',
  description: 'Balance in HMT of a given job address\n',
  operationId: 'get_job_balanace',
  parameters: [
    {
      name: 'address',
      in: 'query',
      description: 'Deployed Job address',
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
      description: 'Manifest Hash of the job',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/int_data_response',
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
  'x-openapi-router-controller': 'human_api.controllers.jobs_controller',
})
  async getJobBalanace(@param({
  name: 'address',
  in: 'query',
  description: 'Deployed Job address',
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
}) gasPayerPrivate: string): Promise<IntDataResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Abort a given job

   *
   * @param _requestBody
   * @returns Was the action successful or not
   */
  @operation('patch', '/job/abort', {
  tags: [
    'Jobs',
  ],
  summary: 'Abort a given job',
  description: 'Abort a given job\n',
  operationId: 'abort_job',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/default_job_update_body',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Was the action successful or not',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/bool_data_response',
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
    '401': {
      description: 'Unauthorized Gas Payer',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/error_unauthorized_response',
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
  'x-openapi-router-controller': 'human_api.controllers.jobs_controller',
})
  async abortJob(@requestBody({
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/default_job_update_body',
      },
    },
  },
}) _requestBody: DefaultJobUpdateBody): Promise<BoolDataResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Cancel a given job

   *
   * @param _requestBody
   * @returns Was the action successful or not
   */
  @operation('patch', '/job/cancel', {
  tags: [
    'Jobs',
  ],
  summary: 'Cancel a given job',
  description: 'Cancel a given job\n',
  operationId: 'cancel_job',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/default_job_update_body',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Was the action successful or not',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/bool_data_response',
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
    '401': {
      description: 'Unauthorized Gas Payer',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/error_unauthorized_response',
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
  'x-openapi-router-controller': 'human_api.controllers.jobs_controller',
})
  async cancelJob(@requestBody({
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/default_job_update_body',
      },
    },
  },
}) _requestBody: DefaultJobUpdateBody): Promise<BoolDataResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Complete a given job

   *
   * @param _requestBody
   * @returns Was the action successful or not
   */
  @operation('patch', '/job/complete', {
  tags: [
    'Jobs',
  ],
  summary: 'Complete a given job',
  description: 'Complete a given job\n',
  operationId: 'complete_job',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/default_job_update_body',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Was the action successful or not',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/bool_data_response',
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
    '401': {
      description: 'Unauthorized Gas Payer',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/error_unauthorized_response',
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
  'x-openapi-router-controller': 'human_api.controllers.jobs_controller',
})
  async completeJob(@requestBody({
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/default_job_update_body',
      },
    },
  },
}) _requestBody: DefaultJobUpdateBody): Promise<BoolDataResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Retrieve the intermediate results stored by the Recording Oracle

   *
   * @param address Deployed Job address
   * @param gasPayer address paying for the gas costs
   * @param gasPayerPrivate Private Key for the address paying for the gas costs
   * @param repOraclePrivate Private Key for the reputation oracle
   * @returns Stringified JSON with intermediate results
   */
  @operation('get', '/job/intermediateResults', {
  tags: [
    'Jobs',
  ],
  summary: 'Retrieve the intermediate results stored by the Recording Oracle',
  description: 'Retrieve the intermediate results stored by the Recording Oracle\n',
  operationId: 'job_intermediate_results',
  parameters: [
    {
      name: 'address',
      in: 'query',
      description: 'Deployed Job address',
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
    {
      name: 'repOraclePrivate',
      in: 'query',
      description: 'Private Key for the reputation oracle',
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
      description: 'Stringified JSON with intermediate results',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/string_data_response',
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
  'x-openapi-router-controller': 'human_api.controllers.jobs_controller',
})
  async jobIntermediateResults(@param({
  name: 'address',
  in: 'query',
  description: 'Deployed Job address',
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
}) gasPayerPrivate: string, @param({
  name: 'repOraclePrivate',
  in: 'query',
  description: 'Private Key for the reputation oracle',
  required: true,
  style: 'form',
  explode: true,
  schema: {
    type: 'string',
  },
}) repOraclePrivate: string): Promise<StringDataResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Given an escrow address, a URL where the results can be found in the form of
a JSON file, and a public key will upload to S3 these intermediate results
and will emit an event on the escrow contract
   *
   * @param _requestBody
   * @returns Store intermediate results for the job
   */
  @operation('post', '/job/intermediateResults', {
  tags: [
    'Jobs',
  ],
  summary: 'Store intermediate results to S3 for the given escrow',
  description: 'Given an escrow address, a URL where the results can be found in the form of a JSON file, and a public key will upload to S3 these intermediate results and will emit an event on the escrow contract',
  operationId: 'store_job_interemediate_results',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/store_job_intermediate_results_body',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Store intermediate results for the job',
      content: {
        'application/json': {
          schema: {
            oneOf: [
              {
                $ref: '#/components/schemas/bool_data_response',
              },
              {
                $ref: '#/components/schemas/polling_url_response',
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
    '401': {
      description: 'Unauthorized Gas Payer',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/error_unauthorized_response',
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
  'x-openapi-router-controller': 'human_api.controllers.jobs_controller',
})
  async storeJobInteremediateResults(@requestBody({
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/store_job_intermediate_results_body',
      },
    },
  },
}) _requestBody: StoreJobIntermediateResultsBody): Promise<BoolDataResponse | PollingUrlResponse> {
    throw new Error('Not implemented');
  }

  /**
   * When the payout happens, final results are uploaded to S3 and contract's
state is updated to Partial or Paid depending on contract's balance.
   *
   * @param _requestBody
   * @returns Bulk payments sent gracefully
   */
  @operation('post', '/job/bulkPayout', {
  tags: [
    'Jobs',
  ],
  summary: 'Performs a payout to multiple ethereum addresses.',
  description: "When the payout happens, final results are uploaded to S3 and contract's state is updated to Partial or Paid depending on contract's balance.",
  operationId: 'bulk_payout_job',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/bulk_payout_job_body',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Bulk payments sent gracefully',
      content: {
        'application/json': {
          schema: {
            oneOf: [
              {
                $ref: '#/components/schemas/bool_data_response',
              },
              {
                $ref: '#/components/schemas/polling_url_response',
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
    '401': {
      description: 'Unauthorized Gas Payer',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/error_unauthorized_response',
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
  'x-openapi-router-controller': 'human_api.controllers.jobs_controller',
})
  async bulkPayoutJob(@requestBody({
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/bulk_payout_job_body',
      },
    },
  },
}) _requestBody: BulkPayoutJobBody): Promise<BoolDataResponse | PollingUrlResponse> {
    throw new Error('Not implemented');
  }

  /**
   * A trusted handler can perform aborts and cancels, for example

   *
   * @param _requestBody
   * @returns Trusted handlers added gracefully
   */
  @operation('post', '/job/addTrustedHandlers', {
  tags: [
    'Jobs',
  ],
  summary: 'Add trusted handlers that can freely transact with the contract',
  description: 'A trusted handler can perform aborts and cancels, for example\n',
  operationId: 'add_job_trusted_handlers',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/add_job_trusted_handlers_body',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Trusted handlers added gracefully',
      content: {
        'application/json': {
          schema: {
            oneOf: [
              {
                $ref: '#/components/schemas/bool_data_response',
              },
              {
                $ref: '#/components/schemas/polling_url_response',
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
    '401': {
      description: 'Unauthorized Gas Payer',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/error_unauthorized_response',
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
  'x-openapi-router-controller': 'human_api.controllers.jobs_controller',
})
  async addJobTrustedHandlers(@requestBody({
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/add_job_trusted_handlers_body',
      },
    },
  },
}) _requestBody: AddJobTrustedHandlersBody): Promise<BoolDataResponse | PollingUrlResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Retrieve the final results

   *
   * @param address Deployed Job address
   * @param gasPayer address paying for the gas costs
   * @param gasPayerPrivate Private Key for the address paying for the gas costs
   * @param repOraclePrivate Private Key for the reputation oracle
   * @returns Stringified JSON with final results
   */
  @operation('get', '/job/finalResults', {
  tags: [
    'Jobs',
  ],
  summary: 'Retrieve the final results',
  description: 'Retrieve the final results\n',
  operationId: 'job_final_results',
  parameters: [
    {
      name: 'address',
      in: 'query',
      description: 'Deployed Job address',
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
    {
      name: 'repOraclePrivate',
      in: 'query',
      description: 'Private Key for the reputation oracle',
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
      description: 'Stringified JSON with final results',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/string_data_response',
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
  'x-openapi-router-controller': 'human_api.controllers.jobs_controller',
})
  async jobFinalResults(@param({
  name: 'address',
  in: 'query',
  description: 'Deployed Job address',
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
}) gasPayerPrivate: string, @param({
  name: 'repOraclePrivate',
  in: 'query',
  description: 'Private Key for the reputation oracle',
  required: true,
  style: 'form',
  explode: true,
  schema: {
    type: 'string',
  },
}) repOraclePrivate: string): Promise<StringDataResponse> {
    throw new Error('Not implemented');
  }

}

