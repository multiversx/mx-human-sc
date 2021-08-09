import { Injectable } from '@nestjs/common';
import { AddJobTrustedHandlersBody } from 'model/addJobTrustedHandlersBody';
import { BoolDataResponse } from 'model/boolDataResponse';
import { BulkPayoutJobBody } from 'model/bulkPayoutJobBody';
import { GetResultsBody } from 'model/getResultsBody';
import { IntDataResponse } from 'model/intDataResponse';
import { JobCreateBody } from 'model/jobCreateBody';
import { JobStatusResponse } from 'model/jobStatusResponse';
import { StringDataResponse } from 'model/stringDataResponse';
import { StoreJobIntermediateResultsBody } from 'model/storeJobIntermediateResultsBody';
import { Address, ContractWrapper, SystemWrapper } from "@elrondnetwork/erdjs/out";
import { makeWallet, prepareContract } from './common';
import { AddressDto } from 'model/addressDto';

@Injectable()
export class JobService {
    constructor(private readonly erdSys: SystemWrapper, private readonly jobContract: ContractWrapper, private readonly factoryContract: ContractWrapper) { }

    async newJob(jobCreateBody: JobCreateBody): Promise<StringDataResponse> {
        let wallet = await makeWallet(jobCreateBody, this.erdSys);
        let jobAddress: Address = await this.factoryContract.address(jobCreateBody.factoryAddress).sender(wallet).call.createJob();

        let reputationOracle = jobCreateBody.repOraclePub;
        let recordingOracle = reputationOracle;
        let reputationOracleStake = 5;
        let recordingOracleStake = 5;
        let manifestUrl = jobCreateBody.manifestUrl;
        let manifestHash = "TODO";
        await this.jobContract.address(jobAddress).sender(wallet)
            .call.setup(
                reputationOracle,
                recordingOracle,
                reputationOracleStake,
                recordingOracleStake,
                manifestUrl,
                manifestHash
            );
        return { data: jobAddress.bech32() };
    }

    private async prepareJob(addressDto: AddressDto): Promise<void> {
        prepareContract(addressDto, this.erdSys, this.jobContract);
    }

    async launcher(addressDto: AddressDto): Promise<StringDataResponse> {
        await this.prepareJob(addressDto);
        let launcherAddress: Address = await this.jobContract.call.launcher();
        return { data: launcherAddress.bech32() };
    }

    async status(addressDto: AddressDto): Promise<JobStatusResponse> {
        await this.prepareJob(addressDto);
        // TODO: figure out the type of status
        let status: any = await this.jobContract.call.status();
        /*Launched,
            Pending,
            Partial,
            Paid,
            Complete,
            Cancelled,*/
        return { status };
    }

    async manifestUrl(addressDto: AddressDto): Promise<StringDataResponse> {
        await this.prepareJob(addressDto);
        let manifest = await this.jobContract.call.manifest();
        return { data: manifest.url };
    }

    async manifestHash(addressDto: AddressDto): Promise<StringDataResponse> {
        await this.prepareJob(addressDto);
        let manifest = await this.jobContract.call.manifest();
        return { data: manifest.hash };
    }

    async balance(addressDto: AddressDto): Promise<IntDataResponse> {
        await this.prepareJob(addressDto);
        return { data: await this.jobContract.call.getBalance() }
    }

    async abort(addressDto: AddressDto): Promise<BoolDataResponse> {
        await this.prepareJob(addressDto);
        await this.jobContract.call.abort();
        return { success: true };
    }

    async cancel(addressDto: AddressDto): Promise<BoolDataResponse> {
        await this.prepareJob(addressDto);
        await this.jobContract.call.cancel();
        return { success: true };
    }

    async complete(addressDto: AddressDto): Promise<BoolDataResponse> {
        await this.prepareJob(addressDto);
        await this.jobContract.call.complete();
        return { success: true };
    }

    async getIntermediateResults(getResultsBody: GetResultsBody): Promise<StringDataResponse> {
        await this.prepareJob(getResultsBody);
        let results = await this.jobContract.call.getResults();
        // TODO: parse results (resolve url?)
        return results;
    }

    async storeIntermediateResults(storeJobIntermediateResultsBody: StoreJobIntermediateResultsBody): Promise<BoolDataResponse> {
        await this.prepareJob(storeJobIntermediateResultsBody);
        let { resultsUrl } = storeJobIntermediateResultsBody;
        let hash = "TODO";
        await this.jobContract.call.storeResults(resultsUrl, hash);
        return { success: true };
    }

    async bulkPayout(bulkPayoutJobBody: BulkPayoutJobBody): Promise<BoolDataResponse> {
        await this.prepareJob(bulkPayoutJobBody);
        let { resultsUrl } = bulkPayoutJobBody;
        let hash = "TODO";
        let payments = "TODO"; // bulkPayoutJobBody.payoutsUrl
        await this.jobContract.call.bulkPayOut(payments, resultsUrl, hash);
        return { success: true };
    }

    async addTrustedHandlers(addJobTrustedHandlersBody: AddJobTrustedHandlersBody): Promise<BoolDataResponse> {
        await this.prepareJob(addJobTrustedHandlersBody);
        let { handlers } = addJobTrustedHandlersBody;
        // TODO convert bech32 -> hex
        await this.jobContract.call.addTrustedHandlers(handlers);
        return { success: true };
    }

    async finalResults(getResultsBody: GetResultsBody): Promise<StringDataResponse> {
        await this.prepareJob(getResultsBody);
        return { data: await this.jobContract.call.getFinalResults() };
    }
}
