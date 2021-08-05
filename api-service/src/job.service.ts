import { Injectable, NotImplementedException } from '@nestjs/common';
import { AddJobTrustedHandlersBody } from 'model/addJobTrustedHandlersBody';
import { BoolDataResponse } from 'model/boolDataResponse';
import { BulkPayoutJobBody } from 'model/bulkPayoutJobBody';
import { GetResultsBody } from 'model/getResultsBody';
import { IntDataResponse } from 'model/intDataResponse';
import { JobCreateBody } from 'model/jobCreateBody';
import { JobStatusResponse } from 'model/jobStatusResponse';
import { JobAddressDto } from 'model/jobAddressDto';
import { StringDataResponse } from 'model/stringDataResponse';
import { StoreJobIntermediateResultsBody } from 'model/storeJobIntermediateResultsBody';

@Injectable()
export class JobService {

    async newJob(jobCreateBody: JobCreateBody): Promise<StringDataResponse> {
        throw new NotImplementedException();
    }

    async launcher(jobAddressDto: JobAddressDto): Promise<StringDataResponse> {
        throw new NotImplementedException();
    }

    async status(jobAddressDto: JobAddressDto): Promise<JobStatusResponse> {
        throw new NotImplementedException();
    }

    async manifestUrl(jobAddressDto: JobAddressDto): Promise<StringDataResponse> {
        throw new NotImplementedException();
    }

    async manifestHash(jobAddressDto: JobAddressDto): Promise<StringDataResponse> {
        throw new NotImplementedException();
    }

    async balance(jobAddressDto: JobAddressDto): Promise<IntDataResponse> {
        throw new NotImplementedException();
    }

    async abort(jobAddressDto: JobAddressDto): Promise<BoolDataResponse> {
        throw new NotImplementedException();
    }

    async cancel(jobAddressDto: JobAddressDto): Promise<BoolDataResponse> {
        throw new NotImplementedException();
    }

    async complete(jobAddressDto: JobAddressDto): Promise<BoolDataResponse> {
        throw new NotImplementedException();
    }

    async getIntermediateResults(getResultsBody: GetResultsBody): Promise<StringDataResponse> {
        throw new NotImplementedException();
    }

    async storeIntermediateResults(storeJobIntermediateResultsBody: StoreJobIntermediateResultsBody): Promise<BoolDataResponse> {
        throw new NotImplementedException();
    }

    async bulkPayout(bulkPayoutJobBody: BulkPayoutJobBody): Promise<BoolDataResponse> {
        throw new NotImplementedException();
    }

    async addTrustedHandlers(addJobTrustedHandlersBody: AddJobTrustedHandlersBody): Promise<BoolDataResponse> {
        throw new NotImplementedException();
    }

    async finalResults(getResultsBody: GetResultsBody): Promise<StringDataResponse> {
        throw new NotImplementedException();
    }
}
