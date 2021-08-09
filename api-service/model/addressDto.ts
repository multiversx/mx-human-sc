import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { GasPayerDto } from "./gasPayerDto";

export class AddressDto extends GasPayerDto {
    @IsNotEmpty()
    @ApiProperty({ example: "testJobAddress", description: 'Deployed job address' })
    address: string;
}
