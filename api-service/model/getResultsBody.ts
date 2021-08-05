import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { JobAddressDto } from "./jobAddressDto";

export class GetResultsBody extends JobAddressDto {
    @IsNotEmpty()
    @ApiProperty({ example: "testRepOraclePrivate", description: 'Private Key for the reputation oracle' })
    repOraclePrivate: string;
}
