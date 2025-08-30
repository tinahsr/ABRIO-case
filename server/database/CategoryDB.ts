import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductDB} from "./ProductDB";

@Entity()
export class CategoryDB {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => ProductDB, (product) => product.categories)
    products: ProductDB[];
}
