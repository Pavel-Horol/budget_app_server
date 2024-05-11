import { IsNotEmpty, IsOptional } from 'class-validator'
import { User } from '../../user/entities/user.entity'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsOptional()
  @ApiProperty()
  user?: User
}
