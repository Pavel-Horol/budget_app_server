import { Category } from '../../category/entities/category.entity'
import { User } from '../../user/entities/user.entity'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTransactionDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  amount: number

  @IsString()
  @ApiProperty()
  type: 'expense' | 'income'

  @IsNotEmpty()
  @ApiProperty()
  category: Category

  @IsNotEmpty()
  @ApiProperty()
  user: User
}
