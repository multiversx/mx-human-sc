import { Injectable, NotImplementedException } from '@nestjs/common';
import { GasPayerDto } from 'model/gasPayerDto';
import { JobListResponse } from 'model/jobListResponse';
import { StringDataResponse } from 'model/stringDataResponse';

@Injectable()
export class FactoryService {

    public getFactory(address: string, gasPayer: string, gasPayerPrivate: string): Promise<JobListResponse> {
        throw new NotImplementedException();
    }

    public newFactory(gasPayerDto: GasPayerDto): Promise<StringDataResponse> {
        throw new NotImplementedException();
    }
}
