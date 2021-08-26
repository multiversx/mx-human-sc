import { Injectable, OnModuleInit } from '@nestjs/common';
import { AddJobTrustedHandlersBody } from 'model/addJobTrustedHandlersBody';
import { BoolDataResponse } from 'model/boolDataResponse';
import { BulkPayoutJobBody } from 'model/bulkPayoutJobBody';
import { GetResultsBody } from 'model/getResultsBody';
import { IntDataResponse } from 'model/intDataResponse';
import { JobCreateBody } from 'model/jobCreateBody';
import { JobStatusResponse } from 'model/jobStatusResponse';
import { StringDataResponse } from 'model/stringDataResponse';
import { StoreJobIntermediateResultsBody } from 'model/storeJobIntermediateResultsBody';
import {
    Address,
    Balance,
    BalanceBuilder,
    ContractWrapper,
    SystemWrapper,
} from '@elrondnetwork/erdjs/out';
import {
    getJsonFromUrl,
    loadContracts,
    makeWallet,
    prepareContract,
    uploadFromUrl,
} from './common';
import { AddressDto } from 'model/addressDto';
import { StorageService } from './storage.service';
import { ApiConfigService } from './apiConfigService';

@Injectable()
export class JobService implements OnModuleInit {
    erdSys: SystemWrapper;
    jobContract: ContractWrapper;
    factoryContract: ContractWrapper;
    humanToken: BalanceBuilder;

    constructor(
        private storage: StorageService,
        private config: ApiConfigService,
    ) { }

    async onModuleInit() {
        const { erdSys, jobContract, factoryContract, humanToken } =
            await loadContracts(this.config);
        this.erdSys = erdSys;
        this.jobContract = jobContract;
        this.factoryContract = factoryContract;
        this.humanToken = humanToken;
    }

    async newJob(jobCreateBody: JobCreateBody): Promise<StringDataResponse> {
        const wallet = await makeWallet(jobCreateBody, this.erdSys);

        const jobAddress = await this.factoryContract
            .address(jobCreateBody.factoryAddress)
            .sender(wallet)
            .gas(30_000_000)
            .call.createJob();
        this.jobContract.address(jobAddress);

        const { repOraclePub, manifestUrl } = jobCreateBody;
        const {
            hash,
            url,
            json: manifest,
        } = await uploadFromUrl(manifestUrl, repOraclePub, this.storage);
        const {
            task_bid_price: taskBidPrice,
            job_total_tasks: numberOfAnswers,
            reputation_oracle_addr: reputationOracle,
            recording_oracle_addr: recordingOracle,
            oracle_stake: oracleStake,
        } = manifest;

        const perJobCost: Balance = this.humanToken(taskBidPrice);
        const humanTokenAmount = perJobCost.times(numberOfAnswers);

        await this.jobContract
            .sender(wallet)
            .value(humanTokenAmount)
            .gas(30_000_000)
            .call.deposit();

        await this.jobContract
            .sender(wallet)
            .gas(30_000_000)
            .call.setup(
                reputationOracle,
                recordingOracle,
                oracleStake,
                oracleStake,
                url,
                hash,
            );

        return { data: jobAddress.bech32() };
    }

    private async prepareJob(addressDto: AddressDto): Promise<void> {
        await prepareContract(addressDto, this.erdSys, this.jobContract);
    }

    async launcher(addressDto: AddressDto): Promise<StringDataResponse> {
        await this.prepareJob(addressDto);
        const launcherAddress: Address =
            await this.jobContract.query.getLauncher();
        return { data: launcherAddress.bech32() };
    }

    async status(addressDto: AddressDto): Promise<JobStatusResponse> {
        await this.prepareJob(addressDto);
        const status: any = await this.jobContract.query.getStatus();
        return { status };
    }

    async manifestUrl(addressDto: AddressDto): Promise<StringDataResponse> {
        await this.prepareJob(addressDto);
        const { url } = await this.jobContract.query.getManifest();
        return { data: url.toString() };
    }

    async manifestHash(addressDto: AddressDto): Promise<StringDataResponse> {
        await this.prepareJob(addressDto);
        const { hash } = await this.jobContract.query.getManifest();
        return { data: hash.toString() };
    }

    async balance(addressDto: AddressDto): Promise<IntDataResponse> {
        await this.prepareJob(addressDto);
        const rawBalance = await this.jobContract
            .gas(30_000_000)
            .call.getBalance();
        const balance = this.humanToken.raw(rawBalance);
        return { data: balance.valueOf().toNumber() };
    }

    async abort(addressDto: AddressDto): Promise<BoolDataResponse> {
        await this.prepareJob(addressDto);
        await this.jobContract.gas(30_000_000).call.abort();
        return { success: true };
    }

    async cancel(addressDto: AddressDto): Promise<BoolDataResponse> {
        await this.prepareJob(addressDto);
        await this.jobContract.gas(30_000_000).call.cancel();
        return { success: true };
    }

    async complete(addressDto: AddressDto): Promise<BoolDataResponse> {
        await this.prepareJob(addressDto);
        await this.jobContract.gas(30_000_000).call.complete();
        return { success: true };
    }

    async getIntermediateResults(
        getResultsBody: GetResultsBody,
    ): Promise<StringDataResponse> {
        await this.prepareJob(getResultsBody);
        const { repOraclePrivate } = getResultsBody;
        const { url } = await this.jobContract.query.getIntermediateResults();
        const results = await this.storage.download(url.toString(), repOraclePrivate);
        return { data: results };
    }

    async storeIntermediateResults(
        storeJobIntermediateResultsBody: StoreJobIntermediateResultsBody,
    ): Promise<BoolDataResponse> {
        await this.prepareJob(storeJobIntermediateResultsBody);
        const { resultsUrl, repOraclePub } = storeJobIntermediateResultsBody;
        const { hash, url } = await uploadFromUrl(
            resultsUrl,
            repOraclePub,
            this.storage,
        );
        await this.jobContract.gas(30_000_000).call.storeResults(url, hash);
        return { success: true };
    }

    async bulkPayout(
        bulkPayoutJobBody: BulkPayoutJobBody,
    ): Promise<BoolDataResponse> {
        await this.prepareJob(bulkPayoutJobBody);
        const { resultsUrl, repOraclePub, payoutsUrl } = bulkPayoutJobBody;
        const { url, hash } = await uploadFromUrl(
            resultsUrl,
            repOraclePub,
            this.storage,
        );
        const payoutsJson = await getJsonFromUrl(payoutsUrl);
        const payouts = payoutsJson.map((address_value_pair) => {
            const [address, value] = address_value_pair;
            return [address, this.humanToken.value(value)];
        });
        await this.jobContract
            .gas(30_000_000)
            .call.bulkPayOut(payouts, { url, hash });
        return { success: true };
    }

    async addTrustedHandlers(
        addJobTrustedHandlersBody: AddJobTrustedHandlersBody,
    ): Promise<BoolDataResponse> {
        await this.prepareJob(addJobTrustedHandlersBody);
        await this.jobContract
            .gas(30_000_000)
            .call.addTrustedHandlers(...addJobTrustedHandlersBody.handlers);
        return { success: true };
    }

    async finalResults(
        getResultsBody: GetResultsBody,
    ): Promise<StringDataResponse> {
        await this.prepareJob(getResultsBody);
        return { data: await this.jobContract.query.getFinalResults() };
    }
}
