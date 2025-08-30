import {Module} from '@nestjs/common'
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductController} from "./product/product.controller";
import {ProductService} from "./product/product.service";
import {CategoryDB} from "../database/CategoryDB";
import {ProductDB} from "../database/ProductDB";
import {CartDB} from "../database/CartDB";
import {CartController} from "./cart/cart.controller";
import {CartService} from "./cart/cart.service";


@Module({
    imports: [
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
        CartController
    ],
    providers: [
        ProductService,
        CartService
    ],
})

export class AppModule {
}
