import {Module} from '@nestjs/common'
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductController} from "./product/product.controller";
import {ProductService} from "./product/product.service";
import {CategoryDB} from "../database/CategoryDB";
import {ProductDB} from "../database/ProductDB";


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: './db.sqlite',
            entities: [
                ProductDB,
                CategoryDB,
            ],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([
            ProductDB,
            CategoryDB,
        ]),
    ],
    controllers: [
        ProductController,
    ],
    providers: [
        ProductService
    ],
})

export class AppModule {
}
