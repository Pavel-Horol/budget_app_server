import { IsEmail, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @MinLength(4, { message: 'Password must be at least 4 characters' })
  password: string
}
