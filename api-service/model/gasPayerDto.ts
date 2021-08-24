import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GasPayerDto {
    @IsNotEmpty()
    @ApiProperty({ example: "testGasPayer", description: 'Address paying for the gas costs' })
    gasPayer: string;

    @IsNotEmpty()
    @ApiProperty({ example: "testGasPayerPrivate", description: 'Private key for the address paying for the gas costs' })
    gasPayerPrivate: string;
}
