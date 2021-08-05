import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddJobTrustedHandlersBody } from 'model/addJobTrustedHandlersBody';
import { BoolDataResponse } from 'model/boolDataResponse';
import { BulkPayoutJobBody } from 'model/bulkPayoutJobBody';
import { GetResultsBody } from 'model/getResultsBody';
import { IntDataResponse } from 'model/intDataResponse';
import { JobCreateBody } from 'model/jobCreateBody';
import { JobStatusResponse } from 'model/jobStatusResponse';
import { JobAddressDto } from 'model/jobAddressDto';
import { StringDataResponse } from 'model/stringDataResponse';
import { JobService } from './job.service';
import { StoreJobIntermediateResultsBody } from 'model/storeJobIntermediateResultsBody';

@ApiTags("job")
@Controller("job")
export class JobController {
    constructor(private readonly jobService: JobService) { }

    /**
     * Creates a new Job and returns the address
     */
    @Post()
    async newJob(@Body() jobCreateBody: JobCreateBody): Promise<StringDataResponse> {
        return this.jobService.newJob(jobCreateBody);
    }

    /**
     * Address of the launcher of a given job address
     * Receive the address of the launcher of a given job address
     */
    @Get("launcher")
    async launcher(@Query() jobAddressDto: JobAddressDto): Promise<StringDataResponse> {
        return this.jobService.launcher(jobAddressDto);
    }

    /**
     * Status of a given job address
     * Receive the status of a given job address 
     * @param address Deployed Job address
     * @param gasPayer address paying for the gas costs
     * @param gasPayerPrivate Private Key for the address paying for the gas costs
     */
    @Get("status")
    async status(@Query() jobAddressDto: JobAddressDto): Promise<JobStatusResponse> {
        return this.jobService.status(jobAddressDto);
    }

    /**
     * Manifest URL of a given job address
     * Receive the Manifest URL of a given job address
     */
    @Get("manifestUrl")
    async manifestUrl(@Query() jobAddressDto: JobAddressDto): Promise<StringDataResponse> {
        return this.jobService.manifestUrl(jobAddressDto);
    }

    /**
     * Manifest Hash of a given job address
     * Receive the Manifest Hash of a given job address
     */
    @Get("manifestHash")
    async manifestHash(@Query() jobAddressDto: JobAddressDto): Promise<StringDataResponse> {
        return this.jobService.manifestHash(jobAddressDto);
    }

    /**
     * Balance in HMT of a given job address
     */
    @Get("balance")
    async balance(@Query() jobAddressDto: JobAddressDto): Promise<IntDataResponse> {
        return this.jobService.balance(jobAddressDto);
    }

    /**
     * Abort a given job
     */
    @Patch("abort")
    async abort(@Body() jobAddressDto: JobAddressDto): Promise<BoolDataResponse> {
        return this.jobService.abort(jobAddressDto);
    }

    /**
     * Cancel a given job
     * @param jobAddressDto 
     */
    @Patch("cancel")
    async cancel(@Body() jobAddressDto: JobAddressDto): Promise<BoolDataResponse> {
        return this.jobService.cancel(jobAddressDto);
    }

    /**
     * Complete a given job
     */
    @Patch("complete")
    async complete(@Body() jobAddressDto: JobAddressDto): Promise<BoolDataResponse> {
        return this.jobService.complete(jobAddressDto);
    }

    /**
     * Retrieve the intermediate results stored by the Recording Oracle
     */
    @Get("intermediateResults")
    async getIntermediateResults(@Query() getResultsBody: GetResultsBody): Promise<StringDataResponse> {
        return this.jobService.getIntermediateResults(getResultsBody);
    }

    /**
     * Store intermediate results to S3 for the given escrow
     * Given an escrow address, a URL where the results can be found in the form of a JSON file, and a public key will upload to S3 these intermediate results and will emit an event on the escrow contract
     */
    @Post("intermediateResults")
    async storeIntermediateResults(@Body() storeJobIntermediateResultsBody: StoreJobIntermediateResultsBody): Promise<BoolDataResponse> {
        return this.jobService.storeIntermediateResults(storeJobIntermediateResultsBody);
    }

    /**
     * Performs a payout to multiple ethereum addresses.
     * When the payout happens, final results are uploaded to S3 and contract\&#39;s state is updated to Partial or Paid depending on contract\&#39;s balance.
     * @param bulkPayoutJobBody 
     */
    @Post("bulkPayout")
    async bulkPayout(@Body() bulkPayoutJobBody: BulkPayoutJobBody): Promise<BoolDataResponse> {
        return this.jobService.bulkPayout(bulkPayoutJobBody);
    }

    /**
     * Add trusted handlers that can freely transact with the contract
     * A trusted handler can perform aborts and cancels
     */
    @Post("addTrustedHandlers")
    async addTrustedHandlers(@Body() addJobTrustedHandlersBody: AddJobTrustedHandlersBody): Promise<BoolDataResponse> {
        return this.jobService.addTrustedHandlers(addJobTrustedHandlersBody);
    }

    /**
     * Retrieve the final results
     * @param address Deployed Job address
     * @param gasPayer address paying for the gas costs
     * @param gasPayerPrivate Private Key for the address paying for the gas costs
     * @param repOraclePrivate Private Key for the reputation oracle
     */
    @Get("finalResults")
    async finalResults(@Query() getResultsBody: GetResultsBody): Promise<StringDataResponse> {
        return this.jobService.finalResults(getResultsBody);
    }

}
