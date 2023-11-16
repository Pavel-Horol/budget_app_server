import { Category } from "src/category/entities/category.entity";
import { Transaction } from "src/transaction/entities/transaction.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Category, (category) => category.user)
    categories: Category[];

    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions: Transaction[];

    @CreateDateColumn({ name: 'createdAt' })
    crearedAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updateAt: Date;
}
