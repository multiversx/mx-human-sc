import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ManifestValidityBody } from 'model/manifestValidityBody';
import { ManifestValidityResponse } from 'model/manifestValidityResponse';
import { ManifestService } from './manifest.service';

@ApiTags('manifest')
@Controller('manifest')
export class ManifestController {
    constructor(private readonly manifestService: ManifestService) {}

    /**
     * Validates a manifest provided by a public URL
     */
    @Get('validate')
    public validate(
        @Query() manifestValidityBody: ManifestValidityBody,
    ): Promise<ManifestValidityResponse> {
        return this.manifestService.validate(manifestValidityBody);
    }
}
