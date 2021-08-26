import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
    constructor(private configService: ConfigService) {}

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

    getChecked(key: string): string {
        const value = this.configService.get<string>(key);
        if (value == undefined) {
            throw new Error(`Missing required configuration for ${key}`);
        }
        return value;
    }

    getUnchecked(key: string): string {
        return this.configService.get<string>(key);
    }
}
