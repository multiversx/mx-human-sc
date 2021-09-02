import { ApiProperty } from "@nestjs/swagger";
import { IsAddress } from "validation/isAddress";
import { IsWalletPrivateKeyHex } from "validation/isWalletPrivateKeyHex";

export class GasPayerDto {
    @IsAddress()
    @ApiProperty({ example: "testGasPayer", description: 'Address paying for the gas costs' })
    gasPayer: string;

    @IsWalletPrivateKeyHex()
    @ApiProperty({ example: "testGasPayerPrivate", description: 'Private key for the address paying for the gas costs' })
    gasPayerPrivate: string;
}
