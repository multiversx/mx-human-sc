import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
    constructor(private configService: ConfigService) { }

    get awsBucketName(): string {
        return this.getChecked('AWS_BUCKETNAME');
    }

    get awsAccessKeyId(): string {
        return this.getChecked('AWS_ACCESS_KEY_ID');
    }

    get awsSecretAccessKey(): string {
        return this.getChecked('AWS_SECRET_ACCESS_KEY');
    }

    get awsEndpointUrl(): string {
        return this.getUnchecked('AWS_ENDPOINT_URL');
    }

    get awsRegion(): string {
        return this.getChecked('AWS_REGION');
    }

    get networkProvider(): string {
        return this.getChecked('NETWORK_PROVIDER');
    }

    get humanTokenIdentifier(): string {
        return this.getChecked('HUMAN_TOKEN_IDENTIFIER');
    }

    get jobTemplateAddress(): string {
        return this.getChecked('JOB_TEMPLATE_ADDRESS');
    }

    get gasFactoryJobs(): number {
        return this.getChecked('GAS_FACTORY_JOBS');
    }

    get gasFactoryDeploy(): number {
        return this.getChecked('GAS_FACTORY_DEPLOY');
    }

    get gasFactoryCreateJob(): number {
        return this.getChecked('GAS_FACTORY_CREATE_JOB');
    }

    get gasJobDeposit(): number {
        return this.getChecked('GAS_JOB_DEPOSIT');
    }

    get gasJobSetup(): number {
        return this.getChecked('GAS_JOB_SETUP');
    }

    get gasJobAbort(): number {
        return this.getChecked('GAS_JOB_ABORT');
    }

    get gasJobCancel(): number {
        return this.getChecked('GAS_JOB_CANCEL');
    }

    get gasJobComplete(): number {
        return this.getChecked('GAS_JOB_COMPLETE');
    }

    get gasJobStoreResults(): number {
        return this.getChecked('GAS_JOB_STORE_RESULTS');
    }

    get gasJobBulkPayOutBase(): number {
        return this.getChecked('GAS_JOB_BULK_PAYOUT_BASE');
    }

    get gasJobBulkPayOutPerItem(): number {
        return this.getChecked('GAS_JOB_BULK_PAYOUT_PER_ITEM');
    }

    get gasJobAddTrustedHandlers(): number {
        return this.getChecked('GAS_JOB_ADD_TRUSTED_HANDLERS');
    }

    getChecked<T>(key: string): T {
        const value = this.configService.get<T>(key);
        if (value == undefined) {
            throw new Error(`Missing required configuration for ${key}`);
        }
        return value;
    }

    getUnchecked(key: string): string {
        return this.configService.get<string>(key);
    }
}
