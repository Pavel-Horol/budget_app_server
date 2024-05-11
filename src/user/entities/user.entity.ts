import { Category } from 'src/category/entities/category.entity'
import { Transaction } from 'src/transaction/entities/transaction.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @ApiProperty()
  email: string

  @Column()
  @ApiProperty()
  password: string

  @OneToMany(() => Category, (category) => category.user)
  @ApiProperty()
  categories: Category[]

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  @ApiProperty()
  transactions: Transaction[]

  @CreateDateColumn({ name: 'createdAt' })
  @ApiProperty()
  crearedAt: Date

  @UpdateDateColumn({ name: 'updatedAt' })
  @ApiProperty()
  updateAt: Date
}
