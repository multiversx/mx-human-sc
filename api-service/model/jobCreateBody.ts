import { ApiProperty } from "@nestjs/swagger";
import { IsUrl } from "class-validator";
import { IsAddress } from "validation/isAddress";
import { IsEciesPublicKey } from "validation/isEciesPublicKey";
import { GasPayerDto } from "./gasPayerDto";

export class JobCreateBody extends GasPayerDto {
    @IsAddress()
    @ApiProperty({ example: "testFactoryAddress", description: 'Address of the factory' })
    factoryAddress: string;

    @IsEciesPublicKey()
    @ApiProperty({ example: "testRepOraclePub", description: 'Reputation oracle ECIES public key' })
    repOraclePub: string;

    @IsUrl()
    @ApiProperty({ example: "http://example.com/manifest.json", description: 'Manifest URL' })
    manifestUrl: string;
}
