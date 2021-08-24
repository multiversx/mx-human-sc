import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { AddressDto } from "./addressDto";

export class StoreJobIntermediateResultsBody extends AddressDto {
    @IsNotEmpty()
    @ApiProperty({ example: "testRepOraclePub", description: 'Reputation oracle secp256k1 public key' })
    repOraclePub: string;

    @IsNotEmpty()
    @ApiProperty({ example: "https://example.com/results.json", description: 'URL to store' })
    resultsUrl: string;
}
