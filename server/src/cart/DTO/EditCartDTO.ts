import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min } from 'class-validator';

export class EditCartDTO {
    @ApiProperty({ description: 'ID of the product to add', example: 'a1b2c3d4' })
    @IsUUID()
    productId: string;

    @ApiProperty({ description: 'Number of items to add', example: 2 })
    @IsInt()
    count: number;
}
