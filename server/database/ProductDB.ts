import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {CategoryDB} from "./CategoryDB";

@Entity()
export class ProductDB {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    /**
     * type: {@link ColorEnum}
     */
    @Column()
    color: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    inventory: number;

    @Column({ default: 'empty.png' })
    picture: string;

    @ManyToMany(() => CategoryDB, (category) => category.products)
    @JoinTable({ name: 'ProductCategories' })
    categories: CategoryDB[];

}
