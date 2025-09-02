import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {CartService} from "./cart.service";
import {GetCartDTO} from "./DTO/GetCartDTO";
import {OkDTO} from "../serverDTO/OkDTO";
import {transformCartDBtoGetCartDTO} from "../utils/utils";
import {EditCartDTO} from "./DTO/EditCartDTO";

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(
        public readonly cartService: CartService,
    ) {}

    @ApiResponse({
        type: [GetCartDTO],
        description: 'gets all cart items',
    })
    @Get('/all')
    async getCart() {
        const cart = await this.cartService.getCart();
        return await Promise.all(
            cart.map(async (cart) => {
                return transformCartDBtoGetCartDTO(cart);
            }),
        );
    }

    @ApiResponse({
        type: OkDTO,
        description: 'Adds a product to the cart',
        status: HttpStatus.CREATED,
    })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addToCart(
        @Body() body: EditCartDTO
    ) {
         await this.cartService.addToCart(body.productId, body.count);
        return new OkDTO(true, 'Item was added to cart');
    }

    @ApiResponse({
        type: OkDTO,
        description: 'Edits the amount of the product in the cart',
        status: HttpStatus.CREATED,
    })
    @Patch()
    @HttpCode(HttpStatus.CREATED)
    async updateCart(
        @Body() body: EditCartDTO
    ) {
        await this.cartService.updateCartItem(body.productId, body.count);
        return new OkDTO(true, 'Item amout was updated');
    }

    @ApiResponse({
        type: OkDTO,
        status: HttpStatus.OK,
        description: 'Deletes a cart item from the cart',
    })
    @HttpCode(HttpStatus.OK)
    @Delete('/:cartItemId')
    async deleteListEntry(
        @Param('cartItemId') cartItemId: string,
    ): Promise<OkDTO> {
        await this.cartService.removeCartItem(cartItemId);
        return new OkDTO(true, 'Cart entry was deleted successfully');
    }
}
