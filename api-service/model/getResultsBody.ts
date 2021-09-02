import { ApiProperty } from "@nestjs/swagger";
import { IsEciesPrivateKey } from "validation/isEciesPrivateKey";
import { AddressDto } from "./addressDto";

export class GetResultsBody extends AddressDto {
    @IsEciesPrivateKey()
    @ApiProperty({ example: "testRepOraclePrivate", description: 'Reputation oracle ECIES private key' })
    repOraclePrivate: string;
}
