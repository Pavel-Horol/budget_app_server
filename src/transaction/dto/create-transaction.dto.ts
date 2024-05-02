import { Category } from '../../category/entities/category.entity'
import { User } from '../../user/entities/user.entity'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateTransactionDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsString()
  type: 'expense' | 'income'

  @IsNotEmpty()
  category: Category

  @IsNotEmpty()
  user: User
}
