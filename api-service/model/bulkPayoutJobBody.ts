import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";
import { JobAddressDto } from "./jobAddressDto";

export class BulkPayoutJobBody extends JobAddressDto {
    @IsNotEmpty()
    @ApiProperty({ example: "<reputation oracles public address> 0x0000000", description: 'Address of the reputation oracle' })
    repOraclePub: string;

    @IsNotEmpty()
    @ApiProperty({ example: "https://example.com/results.json", description: 'URL containing the results in json format' })
    resultsUrl: string;

    @IsUrl()
    @ApiProperty({ example: "https://example.com/payouts.json", description: 'URL containing the payemnts to be made in json format' })
    payoutsUrl: string;
}
