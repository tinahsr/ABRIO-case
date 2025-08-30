import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductDB} from "./ProductDB";

@Entity()
export class CartDB {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    product: ProductDB;

    @Column()
    number: number;
}
