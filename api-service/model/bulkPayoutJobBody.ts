import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";
import { AddressDto } from "./addressDto";

export class BulkPayoutJobBody extends AddressDto {
    @IsNotEmpty()
    @ApiProperty({ example: "testRepOraclePub", description: 'Reputation oracle secp256k1 public key' })
    repOraclePub: string;

    @IsNotEmpty()
    @ApiProperty({ example: "https://example.com/results.json", description: 'URL containing the results in json format' })
    resultsUrl: string;

    @IsUrl()
    @ApiProperty({ example: "https://example.com/payouts.json", description: 'URL containing the payemnts to be made in json format' })
    payoutsUrl: string;
}
