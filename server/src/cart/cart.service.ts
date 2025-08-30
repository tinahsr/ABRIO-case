import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductDB} from "../../database/ProductDB";
import {Repository} from "typeorm";
import {CartDB} from "../../database/CartDB";
import {ProductService} from "../product/product.service";

@Injectable()
export class CartService {

    constructor(
        private readonly productService: ProductService,
        @InjectRepository(ProductDB)
        private readonly productRepository: Repository<ProductDB>,
        @InjectRepository(CartDB)
        private readonly cartRepository: Repository<CartDB>,
    ) {
    }

    /**
     * Fetches all items in the cart with product details.
     *
     * @returns {Promise<CartDB[]>} - List of cart items
     */
    async getCart(): Promise<CartDB[]> {
        return await this.cartRepository.find({
            relations: ['product'],
        });
    }

    /**
     * Adds a product to the cart.
     *
     * @param productId - the ID of the product to be added
     * @param count - how much of the product should be added
     */
    async addToCart(productId: string, count: number) {
        const product = await this.productService.getProductById(productId);

        if (product.inventory < count) {
            throw new BadRequestException(
                `Cannot add ${count} items to cart. Only ${product.inventory} in stock.`
            );
        }

        let cartItem = await this.cartRepository.findOne({
            where: { product: { id: productId } },
            relations: ['product'],
        });

        if (cartItem) {
            cartItem.count += count;
        } else {
            cartItem = this.cartRepository.create({
                product,
                count,
            });
        }
        await this.cartRepository.save(cartItem);

        product.inventory -= count;
        await this.productRepository.save(product);
    }

    /**
     * Updates the amount of the product in the cart.
     *
     * @param productId - the ID of the product to be added
     * @param newCount - new Count of the item
     */
    async updateCartItem(productId: string, newCount: number) {
        const cartItem = await this.cartRepository.findOne({
            where: {product: {id: productId}},
            relations: ['product'],
        });
        if (!cartItem) throw new NotFoundException(`Product not in cart.`);

        const difference = newCount - cartItem.count;

        if (difference > 0 && cartItem.product.inventory < difference) {
            throw new BadRequestException(
                `Cannot increase to ${newCount}. Only ${cartItem.product.inventory} items available.`,
            );
        }

        cartItem.product.inventory -= difference;
        cartItem.count = newCount;

        await this.productRepository.save(cartItem.product);
        await this.cartRepository.save(cartItem);
    }

    /**
     * Removes a product from the cart.
     *
     * @param productId - the ID of the product to be added
     */
    async removeCartItem(productId: string) {
        const cartItem = await this.cartRepository.findOne({
            where: { product: { id: productId } },
            relations: ['product'],
        });
        if (!cartItem) throw new NotFoundException(`Product not in cart.`);

        cartItem.product.inventory += cartItem.count;
        await this.productRepository.save(cartItem.product);

        await this.cartRepository.remove(cartItem);
    }
}