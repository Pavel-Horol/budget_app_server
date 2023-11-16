import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService){}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const passwordIsMatched = await argon2.verify(user.password, pass);
    if (user && user.password === pass) {
      
    }
    throw new BadRequestException('User or password mismatch')
  }

}
