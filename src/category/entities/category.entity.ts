import { Transaction } from 'src/transaction/entities/transaction.entity'
import { User } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  @ApiProperty()
  id: number

  @ManyToOne(() => User, (user) => user.categories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[]

  @Column()
  @ApiProperty()
  title: string

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date

  @UpdateDateColumn()
  @ApiProperty()
  updateAt: Date
}
