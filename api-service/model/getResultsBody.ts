import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { AddressDto } from "./addressDto";

export class GetResultsBody extends AddressDto {
    @IsNotEmpty()
    @ApiProperty({ example: "testRepOraclePrivate", description: 'Reputation oracle secp256k1 private key' })
    repOraclePrivate: string;
}
