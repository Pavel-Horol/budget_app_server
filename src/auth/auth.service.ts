import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { IUSER } from '../types/types'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email)
    const passwordIsMatched = await argon2.verify(user.password, pass)
    if (user && passwordIsMatched) {
      return user
    }
    throw new BadRequestException('User or password mismatch')
  }
  async login(user: IUSER) {
    const { id, email } = user
    return {
      id,
      email,
      token: this.jwtService.sign({ id: id, email: email }),
    }
  }
}
