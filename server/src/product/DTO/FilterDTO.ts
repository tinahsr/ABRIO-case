
import { ApiPropertyOptional } from '@nestjs/swagger';
import {IsArray, IsEnum, IsOptional} from "class-validator";
import {Transform} from "class-transformer";
import {ColorEnum} from "../../../database/ColorEnum";

export enum SortOrder {
    priceASC = 'priceASC',
    priceDESC = 'priceDESC',
}

export class FilterDTO {
    @ApiPropertyOptional({
        description: 'Sort products by different criteria',
        example: 'priceASC',
        enum: SortOrder,
    })
    @IsOptional()
    @IsEnum(SortOrder)
    sortOrder?: SortOrder;

    @ApiPropertyOptional({
        description: 'Filter products by category names',
        example: ['Sport'],
    })
    @IsOptional()
    @IsArray()
    categories?: string[];

    @ApiPropertyOptional({
        description: 'Filter products by color(s)',
        example: ['red', 'blue'],
        isArray: true,
    })
    @IsOptional()
    @IsArray()
    colors?: ColorEnum[];
}
