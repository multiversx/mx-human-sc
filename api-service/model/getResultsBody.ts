import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { AddressDto } from "./addressDto";

export class GetResultsBody extends AddressDto {
    @IsNotEmpty()
    @ApiProperty({ example: "testRepOraclePrivate", description: 'Private Key for the reputation oracle' })
    repOraclePrivate: string;
}
