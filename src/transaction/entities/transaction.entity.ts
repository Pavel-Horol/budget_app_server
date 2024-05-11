import { Category } from 'src/category/entities/category.entity'
import { User } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Transaction {
  @PrimaryColumn({ name: 'transaction_id' })
  @ApiProperty()
  id: number

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Category, (category) => category.transactions, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column()
  @ApiProperty()
  title: string

  @Column({ nullable: true })
  @ApiProperty()
  type: string

  @Column()
  @ApiProperty()
  amount: number

  @CreateDateColumn()
  @ApiProperty()
  crearedAt: Date

  @UpdateDateColumn()
  @ApiProperty()
  updateAt: Date
}
