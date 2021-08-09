import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { AddressDto } from "./addressDto";

export class AddJobTrustedHandlersBody extends AddressDto {
    @IsArray()
    @ApiProperty({ example: "[\"testAddress1\", \"testAddress2\"]", description: 'An array of addresses to be trusted' })
    handlers: Array<string>;
}
