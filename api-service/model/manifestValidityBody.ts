import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class ManifestValidityBody {
    @IsUrl()
    @ApiProperty({ example: "https://example.com", description: 'Publicly available manifest URL' })
    manifestUrl: string;
}

