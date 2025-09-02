import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import {CategoryDB} from "../../database/CategoryDB";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryDB)
        private categoryRepository: Repository<CategoryDB>,
    ) {}

    /**
     * Gets all existing categories.
     *
     * @returns {Promise<CategoryDB[]>} - The existing categories.
     * @throws {NotFoundException} - Throws an exception if no categories are found.
     */
    async getCategories(): Promise<CategoryDB[]> {
        const categories = await this.categoryRepository.find();
        if (categories.length === 0) {
            throw new NotFoundException('No categories found');
        }
        return categories;
    }

    /**
     * Finds categories by their ids.
     *
     * @param {number[]} ids - The ids to search for.
     * @returns {Promise<CategoryDB[]>} - The categories with the fitting ids.
     * @throws {NotFoundException} - Throws an exception if no categories are found for the given ids.
     */
    async getCategoriesByIds(ids: number[]): Promise<CategoryDB[]> {
        const categories = await this.categoryRepository.findBy({ id: In(ids) });
        if (categories.length === 0) {
            throw new NotFoundException('No categories found with the given ids');
        }
        return categories;
    }
}
