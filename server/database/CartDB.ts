import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProductDB} from "./ProductDB";

@Entity()
export class CartDB {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ProductDB, { eager: true })
    product: ProductDB;

    @Column()
    count: number;
}
