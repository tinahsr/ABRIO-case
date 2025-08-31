import {ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Controller, Get, Param, Query, Res} from '@nestjs/common';
import {ProductService} from "./product.service";
import {GetProductDTO} from "./DTO/GetProductDTO";
import {FilterDTO} from "./DTO/FilterDTO";
import {transformProductDBtoGetProductDTO} from "../utils/utils";
import {join} from "path";
import express from 'express';


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


    @ApiResponse({
        status: 200,
        description: 'Successfully fetched the product picture',
        content: {
            'image/png': {
                example: 'Product picture image file',
            },
            'image/jpeg': {
                example: 'Product picture image file',
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Product picture not found',
    })
    @ApiParam({
        name: 'image',
        description: 'The filename of the product picture to fetch',
        example: 'productPicture123.png',
    })
    @Get('productPicture/:image')
    async getProductPicture(@Param('image') image: string, @Res() res: express.Response) {
        const imgPath: string = join(
            process.cwd(),
            'uploads',
            'productPictures',
            image,
        );
        res.sendFile(imgPath);
    }
}
