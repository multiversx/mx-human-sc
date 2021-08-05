import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GasPayerDto } from 'model/gasPayerDto';
import { JobListResponse } from 'model/jobListResponse';
import { FactoryGetBody } from 'model/models';
import { StringDataResponse } from 'model/stringDataResponse';
import { FactoryService } from './factory.service';

@ApiTags("factory")
@Controller("factory")
export class FactoryController {
    constructor(private readonly factoryService: FactoryService) { }

    /**
     * Returns addresses of all jobs deployed in the factory
     * Receive the list of all jobs in the factory
     */
    @Get()
    public getFactory(@Query() factoryGetBody: FactoryGetBody): Promise<JobListResponse> {
        return this.factoryService.getFactory(factoryGetBody.address, factoryGetBody.gasPayer, factoryGetBody.gasPayerPrivate);
    }

    /**
     * Creates a new factory and returns the address
     */
    @Post()
    public newFactory(@Body() gasPayerDto: GasPayerDto): Promise<StringDataResponse> {
        return this.factoryService.newFactory(gasPayerDto);
    }
}
