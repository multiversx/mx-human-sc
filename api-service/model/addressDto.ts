import { ApiProperty } from "@nestjs/swagger";
import { IsAddress } from "validation/isAddress";
import { GasPayerDto } from "./gasPayerDto";

export class AddressDto extends GasPayerDto {
    @IsAddress()
    @ApiProperty({ example: "testJobAddress", description: 'Deployed job address' })
    address: string;
}
