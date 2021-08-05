import { IntersectionType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { JobAddressDto } from "./jobAddressDto";

export class StoreJobIntermediateResultsBody extends JobAddressDto {
    @IsNotEmpty()
    @ApiProperty({ example: "<reputation oracles public address> 0x0000000", description: 'Address of the reputation oracle' })
    repOraclePub: string;

    @IsNotEmpty()
    @ApiProperty({ example: "https://example.com", description: 'URL to store' })
    resultsUrl: string;
}