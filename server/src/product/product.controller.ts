import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {Controller, Get, Query} from '@nestjs/common';
import {ProductService} from "./product.service";
import {GetProductDTO} from "./DTO/GetProductDTO";
import {FilterDTO} from "./DTO/FilterDTO";
import {transformProductDBtoGetProductDTO} from "../utils/utils";


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
        if (query.colors && !Array.isArray(query.colors)) {
            query.colors = [query.colors];
        }

        if (query.categories && !Array.isArray(query.categories)) {
            query.categories = [query.categories];
        }

        const products = await this.productService.getProducts(query);
        return await Promise.all(
            products.map(async (product) => {
                return transformProductDBtoGetProductDTO(product);
            }),
        );
    }
}
