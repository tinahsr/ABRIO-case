import { ApiProperty } from '@nestjs/swagger';
import {Type} from "class-transformer";
import {GetProductDTO} from "../../product/DTO/GetProductDTO";

export class GetCartDTO {
    @ApiProperty({ description: 'the ID of the cart entry', example: 1 })
    id: string;

    @ApiProperty({
        description: 'the selected product',
        type: GetProductDTO,
    })
    @Type(() => GetProductDTO)
    product: GetProductDTO;

    @ApiProperty({ description: 'How many item instances are in the cart', example: 3 })
    count: number;
}
