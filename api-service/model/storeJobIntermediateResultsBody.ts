import { ApiProperty } from "@nestjs/swagger";
import { IsUrl } from "class-validator";
import { IsEciesPublicKey } from "validation/isEciesPublicKey";
import { AddressDto } from "./addressDto";

export class StoreJobIntermediateResultsBody extends AddressDto {
    @IsEciesPublicKey()
    @ApiProperty({ example: "testRepOraclePub", description: 'Reputation oracle ECIES public key' })
    repOraclePub: string;

    @IsUrl()
    @ApiProperty({ example: "https://example.com/results.json", description: 'URL to store' })
    resultsUrl: string;
}
