import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GasPayerDto } from 'model/gasPayerDto';
import { JobListResponse } from 'model/jobListResponse';
import { FactoryGetBody } from 'model/models';
import { StringDataResponse } from 'model/stringDataResponse';
import { FactoryService } from './factory.service';

@ApiTags('factory')
@Controller('factory')
export class FactoryController {
    constructor(private readonly factoryService: FactoryService) { }

    @Get()
    public getFactory(
        @Query() factoryGetBody: FactoryGetBody,
    ): Promise<JobListResponse> {
        return this.factoryService.getFactory(factoryGetBody);
    }

    @Post()
    public newFactory(
        @Body() gasPayerDto: GasPayerDto,
    ): Promise<StringDataResponse> {
        return this.factoryService.newFactory(gasPayerDto);
    }
}
