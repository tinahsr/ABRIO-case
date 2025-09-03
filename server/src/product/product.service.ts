import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import {ProductDB} from "../../database/ProductDB";
import {FilterDTO, SortOrder} from "./DTO/FilterDTO";

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductDB)
        private readonly productRepository: Repository<ProductDB>,
    ) {}

    /**
     * Gets all existing products using the applied filters.
     *
     * @returns {Promise<ProductDB[]>} - The existing products.
     * @throws {NotFoundException} - Throws an exception if no products are found.
     */
    async getProducts(filter: FilterDTO): Promise<ProductDB[]> {
        const query = this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.categories', 'category');

        if (filter.categories?.length) {
            query.andWhere('category.name IN (:...categories)', { categories: filter.categories });
        }

        if (filter.colors?.length) {
            query.andWhere('product.color IN (:...colors)', { colors: filter.colors });
        }

        if (filter.sortOrder) {
            switch (filter.sortOrder) {
                case SortOrder.priceASC:
                    query.orderBy('product.price', 'ASC');
                    break;
                case SortOrder.priceDESC:
                    query.orderBy('product.price', 'DESC');
                    break;
            }
        }

        const products = await query.getMany();

        if (!products.length) {
            throw new NotFoundException('No products found matching the given filters');
        }

        return products;
    }

    /**
     * Finds a specific product by its ID
     * @param productId - The ID of the event.
     *
     * @returns The product.
     *
     * @throws NotFoundException If the product with the given `productId` does not exist.
     */
    async getProductById(productId: string): Promise<ProductDB> {
        const product = await this.productRepository.findOne({
            where: { id: productId },
            relations: {
                categories: true,
            },
        });
        if (!product) {
            throw new NotFoundException(`Product with ID ${productId} not found`);
        }
        return product;
    }
}
