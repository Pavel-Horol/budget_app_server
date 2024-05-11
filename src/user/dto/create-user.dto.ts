import { IsEmail, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string

  @MinLength(4, { message: 'Password must be at least 4 characters' })
  @ApiProperty()
  password: string
}
