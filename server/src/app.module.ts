import {Module} from '@nestjs/common'
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductController} from "./product/product.controller";
import {ProductService} from "./product/product.service";
import {CategoryDB} from "../database/CategoryDB";
import {ProductDB} from "../database/ProductDB";
import {CartDB} from "../database/CartDB";
import {CartController} from "./cart/cart.controller";
import {CartService} from "./cart/cart.service";
import {InitSeeder} from "../database/seeder";
import {CategoryService} from "./category/category.service";
import {CategoryController} from "./category/category.controller";
import {join} from "path";
import {ServeStaticModule} from "@nestjs/serve-static";


@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', 'client', 'dist', 'client', 'browser'),
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: './db.sqlite',
            entities: [
                ProductDB,
                CategoryDB,
                CartDB,
            ],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([
            ProductDB,
            CategoryDB,
            CartDB
        ]),
    ],
    controllers: [
        ProductController,
        CartController,
        CategoryController
    ],
    providers: [
        ProductService,
        CartService,
        CategoryService,
        InitSeeder
    ],
})

export class AppModule {
}
