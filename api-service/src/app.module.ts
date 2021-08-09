import { setupInteractive, SystemWrapper } from '@elrondnetwork/erdjs/out';
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
    providers: [{
        provide: FactoryService,
        useFactory: loadFactoryService,
    },
        ManifestService,
    {
        provide: JobService,
        useFactory: loadJobService
    }],
})
export class AppModule { }

async function loadFactoryService(): Promise<FactoryService> {
    let { erdSys } = await setupInteractive("local-testnet");
    let factoryContract = await erdSys.loadWrapper("../job-factory");
    return new FactoryService(erdSys, factoryContract);
}

async function loadJobService(): Promise<JobService> {
    let { erdSys } = await setupInteractive("local-testnet");
    let jobContract = await erdSys.loadWrapper("../job");
    let factoryContract = await erdSys.loadWrapper("../job-factory");
    return new JobService(erdSys, jobContract, factoryContract);
}
