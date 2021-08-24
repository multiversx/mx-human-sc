import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from './apiConfigService';
import { FactoryController } from './factory.controller';
import { FactoryService } from './factory.service';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { ManifestController } from './manifest.controller';
import { ManifestService } from './manifest.service';
import { StorageService } from './storage.service';

@Module({
    imports: [ConfigModule.forRoot({ envFilePath: 'config.env' })],
    controllers: [FactoryController, ManifestController, JobController],
    providers: [
        ApiConfigService,
        StorageService,
        FactoryService,
        ManifestService,
        JobService,
    ],
})
export class AppModule {}
