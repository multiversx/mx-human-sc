import { ApiProperty } from "@nestjs/swagger";
import { IsUrl } from "class-validator";
import { IsEciesPublicKey } from "validation/isEciesPublicKey";
import { AddressDto } from "./addressDto";

export class BulkPayoutJobBody extends AddressDto {
    @IsEciesPublicKey()
    @ApiProperty({ example: "testRepOraclePub", description: 'Reputation oracle ECIES public key' })
    repOraclePub: string;

    @IsUrl()
    @ApiProperty({ example: "https://example.com/results.json", description: 'URL containing the results in json format' })
    resultsUrl: string;

    @IsUrl()
    @ApiProperty({ example: "https://example.com/payouts.json", description: 'URL containing the payemnts to be made in json format' })
    payoutsUrl: string;
}
