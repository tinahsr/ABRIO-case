import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {Controller, Get} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CategoryDB} from "../../database/CategoryDB";

@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(
        public readonly categoryService: CategoryService,
    ) {}

    @ApiResponse({
        type: [CategoryDB],
        description: 'gets all categories',
    })
    @Get('/all')
    async getAllCategories() {
        return await this.categoryService.getCategories();
    }
}
