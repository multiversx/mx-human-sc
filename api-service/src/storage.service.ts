import { Injectable, OnModuleInit } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ApiConfigService } from './apiConfigService';
import * as eciesjs from 'eciesjs';
import * as crypto from 'crypto';

@Injectable()
export class StorageService implements OnModuleInit {
    s3: S3;
    constructor(private config: ApiConfigService) {}

    onModuleInit() {
        this.s3 = new S3({
            accessKeyId: this.config.awsAccessKeyId,
            secretAccessKey: this.config.awsSecretAccessKey,
            endpoint: this.config.awsEndpointUrl,
            region: this.config.awsRegion,
        });
    }

    async download(key: string, privateKey: string): Promise<string> {
        return await this.s3
            .getObject({
                Key: key,
                Bucket: this.config.awsBucketName,
            })
            .promise()
            .then((data) => {
                const encryptedMessageBuffer = Buffer.from(
                    data.Body.toString(),
                    'hex',
                );
                const decryptedMessageBuffer = eciesjs.decrypt(
                    privateKey,
                    encryptedMessageBuffer,
                );
                const message = Buffer.from(decryptedMessageBuffer).toString();
                return message;
            })
            .catch((err) => {
                throw err;
            });
    }

    async upload(
        msg: string,
        publicKey: string,
    ): Promise<{ hash: string; key: string }> {
        const messageBuffer = Buffer.from(msg);
        const hash = crypto
            .createHash('sha1')
            .update(messageBuffer)
            .digest()
            .toString('hex');
        const key = `s3${hash}`;

        const encryptedMessage = eciesjs
            .encrypt(publicKey, messageBuffer)
            .toString('hex');
        return await this.s3
            .upload({
                Bucket: this.config.awsBucketName,
                Key: key,
                Body: encryptedMessage,
            })
            .promise()
            .then(() => {
                return { hash, key };
            })
            .catch((err) => {
                throw err;
            });
    }
}
