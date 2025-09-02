import {ProductDB} from "./ProductDB";
import {InjectRepository} from "@nestjs/typeorm";
import {OnApplicationBootstrap} from "@nestjs/common";
import {Repository} from "typeorm";
import {CategoryDB} from "./CategoryDB";
import {ColorEnum} from "./ColorEnum";


const CATEGORY_SEED: Partial<CategoryDB>[] = [
    { name: "Sport" },
    { name: "Freizeit" },
    { name: "Business" },
];


const PRODUCT_SEED: Array<Partial<ProductDB> & { categoryNames: string[] }> = [
    {
        name: "Laufschuhe Pro",
        color: ColorEnum.blue,
        inventory: 18,
        price: 89.99,
        picture: "laufschuhe-pro.png",
        categoryNames: ["Sport", "Freizeit"],
    },
    {
        name: "Sneaker Classic",
        color: ColorEnum.red,
        inventory: 32,
        price: 64.99,
        picture: "sneaker-classic.png",
        categoryNames: ["Freizeit"],
    },
    {
        name: "Jogginghose Flex",
        color: ColorEnum.green,
        inventory: 24,
        price: 39.99,
        picture: "jogginghose-flex.png",
        categoryNames: ["Sport", "Freizeit"],
    },
    {
        name: "Poloshirt Premium",
        color: ColorEnum.blue,
        inventory: 20,
        price: 49.99,
        picture: "poloshirt-premium.png",
        categoryNames: ["Freizeit", "Business"],
    },
    {
        name: "Hemd Slim Fit",
        color: ColorEnum.green,
        inventory: 15,
        price: 54.99,
        picture: "hemd-slimfit.png",
        categoryNames: ["Business"],
    },
    {
        name: "Blazer Smart",
        color: ColorEnum.red,
        inventory: 8,
        price: 129.99,
        picture: "blazer-smart.png",
        categoryNames: ["Business"],
    },
    {
        name: "Chino Komfort",
        color: ColorEnum.green,
        inventory: 22,
        price: 59.99,
        picture: "chino-komfort.png",
        categoryNames: ["Freizeit", "Business"],
    },
    {
        name: "Trainingsjacke Tech",
        color: ColorEnum.red,
        inventory: 17,
        price: 69.99,
        picture: "trainingsjacke-tech.png",
        categoryNames: ["Sport", "Freizeit"],
    },
    {
        name: "Funktionsshirt Aero",
        color: ColorEnum.blue,
        inventory: 28,
        price: 29.99,
        picture: "funktionsshirt-aero.png",
        categoryNames: ["Sport"],
    },
    {
        name: "Business-Schuhe Leder",
        color: ColorEnum.red,
        inventory: 12,
        price: 119.99,
        picture: "business-schuhe-leder.png",
        categoryNames: ["Business"],
    },
];

export class InitSeeder implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(ProductDB)
        private readonly productRepository: Repository<ProductDB>,

        @InjectRepository(CategoryDB)
        private readonly categoryRepository: Repository<CategoryDB>,
    ) {
    }

    async onApplicationBootstrap() {
        const categoryCount = await this.categoryRepository.count();
        if (categoryCount === 0) {
            await this.initCategories();
        }

        const productCount = await this.productRepository.count();
        if (productCount === 0) {
            const categories = await this.categoryRepository.find();
            await this.initProducts(categories);
        }
    }

    private async initCategories() {
        const categories: CategoryDB[] = CATEGORY_SEED.map(seed => {
            return this.categoryRepository.create(seed);
        });

        await this.categoryRepository.save(categories);
    }

    private async initProducts(categories: CategoryDB[]) {
        const products = PRODUCT_SEED.map(seed => {
            const product = this.productRepository.create({
                name: seed.name,
                price: seed.price,
                picture: seed.picture ?? "empty.png",
                color: seed.color ?? 0,
                inventory: seed.inventory ?? 0,
            });
            if (seed.categoryNames?.length) {
                product.categories = categories.filter(c =>
                    seed.categoryNames.includes(c.name),
                );
            } else {
                product.categories = [];
            }
            return product;
        });

        await this.productRepository.save(products);
    }
}
