import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { JobAddressDto } from "./jobAddressDto";

export class AddJobTrustedHandlersBody extends JobAddressDto {
    @IsArray()
    @ApiProperty({ example: "[\"testAddress1\", \"testAddress2\"]", description: 'An array of addresses to be trusted' })
    handlers: Array<string>;
}
