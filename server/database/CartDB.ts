import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProductDB} from "./ProductDB";

@Entity()
export class CartDB {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ProductDB)
    product: ProductDB;

    @Column()
    count: number;
}
