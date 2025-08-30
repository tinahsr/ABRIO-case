import { ApiProperty } from '@nestjs/swagger';

export class GetProductDTO {
    @ApiProperty({ description: 'the ID of the product', example: 1 })
    id: string;

    @ApiProperty({ description: 'the name of the product', example: "T-Shirt" })
    name: string;

    @ApiProperty({ description: 'The color of the product (enum value)', example: 1 })
    color: number;

    @ApiProperty({ description: 'The price of the product', example: 19.99 })
    price: number;

    @ApiProperty({ description: 'How many items are in stock', example: 42 })
    inventory: number;

    @ApiProperty({ description: 'Picture filename or URL', example: 'tshirt.png' })
    picture: string;

    @ApiProperty({
        description: 'Category names this product belongs to',
        type: [String],
        example: ['Clothing', 'Summer Collection'],
    })
    categories: string[];
}
