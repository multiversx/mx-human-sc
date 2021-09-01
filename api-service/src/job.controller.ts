import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddJobTrustedHandlersBody } from 'model/addJobTrustedHandlersBody';
import { BoolDataResponse } from 'model/boolDataResponse';
import { BulkPayoutJobBody } from 'model/bulkPayoutJobBody';
import { GetResultsBody } from 'model/getResultsBody';
import { IntDataResponse } from 'model/intDataResponse';
import { JobCreateBody } from 'model/jobCreateBody';
import { JobStatusResponse } from 'model/jobStatusResponse';
import { AddressDto } from 'model/addressDto';
import { StringDataResponse } from 'model/stringDataResponse';
import { JobService } from './job.service';
import { StoreJobIntermediateResultsBody } from 'model/storeJobIntermediateResultsBody';

@ApiTags('job')
@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService) { }

    @Post()
    async newJob(
        @Body() jobCreateBody: JobCreateBody,
    ): Promise<StringDataResponse> {
        return this.jobService.newJob(jobCreateBody);
    }

    @Get('launcher')
    async launcher(
        @Query() jobAddressDto: AddressDto,
    ): Promise<StringDataResponse> {
        return this.jobService.launcher(jobAddressDto);
    }

    @Get('status')
    async status(
        @Query() jobAddressDto: AddressDto,
    ): Promise<JobStatusResponse> {
        return this.jobService.status(jobAddressDto);
    }

    @Get('manifestUrl')
    async manifestUrl(
        @Query() jobAddressDto: AddressDto,
    ): Promise<StringDataResponse> {
        return this.jobService.manifestUrl(jobAddressDto);
    }

    @Get('manifestHash')
    async manifestHash(
        @Query() jobAddressDto: AddressDto,
    ): Promise<StringDataResponse> {
        return this.jobService.manifestHash(jobAddressDto);
    }

    @Get('balance')
    async balance(
        @Query() jobAddressDto: AddressDto,
    ): Promise<IntDataResponse> {
        return this.jobService.balance(jobAddressDto);
    }

    @Patch('abort')
    async abort(@Body() jobAddressDto: AddressDto): Promise<BoolDataResponse> {
        return this.jobService.abort(jobAddressDto);
    }

    @Patch('cancel')
    async cancel(@Body() jobAddressDto: AddressDto): Promise<BoolDataResponse> {
        return this.jobService.cancel(jobAddressDto);
    }

    @Patch('complete')
    async complete(
        @Body() jobAddressDto: AddressDto,
    ): Promise<BoolDataResponse> {
        return this.jobService.complete(jobAddressDto);
    }

    @Get('intermediateResults')
    async getIntermediateResults(
        @Query() getResultsBody: GetResultsBody,
    ): Promise<StringDataResponse> {
        return this.jobService.getIntermediateResults(getResultsBody);
    }

    @Post('intermediateResults')
    async storeIntermediateResults(
        @Body()
        storeJobIntermediateResultsBody: StoreJobIntermediateResultsBody,
    ): Promise<BoolDataResponse> {
        return this.jobService.storeIntermediateResults(
            storeJobIntermediateResultsBody,
        );
    }

    @Post('bulkPayout')
    async bulkPayout(
        @Body() bulkPayoutJobBody: BulkPayoutJobBody,
    ): Promise<BoolDataResponse> {
        return this.jobService.bulkPayout(bulkPayoutJobBody);
    }

    @Post('addTrustedHandlers')
    async addTrustedHandlers(
        @Body() addJobTrustedHandlersBody: AddJobTrustedHandlersBody,
    ): Promise<BoolDataResponse> {
        return this.jobService.addTrustedHandlers(addJobTrustedHandlersBody);
    }

    @Get('finalResults')
    async finalResults(
        @Query() getResultsBody: GetResultsBody,
    ): Promise<StringDataResponse> {
        return this.jobService.finalResults(getResultsBody);
    }
}
