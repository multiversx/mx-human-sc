import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { GasPayerDto } from "./gasPayerDto";

export class JobCreateBody extends GasPayerDto {
    @IsNotEmpty()
    @ApiProperty({ example: "testFactoryAddress", description: 'Address of the factory' })
    factoryAddress: string;

    @IsNotEmpty()
    @ApiProperty({ example: "testRepOraclePub", description: 'Address of the reputation oracle' })
    repOraclePub: string;

    @IsNotEmpty()
    @ApiProperty({ example: "http://example.com/manifest.json", description: 'Manifest URL' })
    manifestUrl: string;
}