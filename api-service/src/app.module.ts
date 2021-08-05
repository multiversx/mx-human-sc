import { Module } from '@nestjs/common';
import { FactoryController } from './factory.controller';
import { FactoryService } from './factory.service';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { ManifestController } from './manifest.controller';
import { ManifestService } from './manifest.service';

@Module({
    imports: [],
    controllers: [FactoryController, ManifestController, JobController],
    providers: [FactoryService, ManifestService, JobService],
})
export class AppModule { }
