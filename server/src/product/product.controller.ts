import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {Controller, Get, Query} from '@nestjs/common';
import {ProductService} from "./product.service";
import {GetProductDTO} from "./DTO/GetProductDTO";
import {ProductDB} from "../../database/ProductDB";
import {FilterDTO} from "./DTO/FilterDTO";


@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(
        public readonly productService: ProductService,
    ) {
    }

    @ApiResponse({
        type: [GetProductDTO],
        description:
            'A list of all products',
    })
    @Get('/allProducts')
    async getProducts(
        @Query() query: FilterDTO,
    ): Promise<GetProductDTO[]> {
        const products = await this.productService.getProducts(query);
        return await Promise.all(
            products.map(async (product) => {
                return this.transformProductDBtoGetProductDTO(product);
            }),
        );
    }

    /**
     * Transforms a ProductDB object into a GetProductDTO.
     * @returns {GetProductDTO} - The transformed product data transfer object.
     * @param product - the product to be transformed
     */
    transformProductDBtoGetProductDTO(product: ProductDB): GetProductDTO {
        const dto = new GetProductDTO();
        dto.id = product.id;
        dto.name = product.name;
        dto.color = product.color;
        dto.price = product.price;
        dto.inventory = product.inventory;
        dto.picture = product.picture;
        dto.categories = product.categories?.map((c) => c.name) || [];

        return dto;
    }
}
