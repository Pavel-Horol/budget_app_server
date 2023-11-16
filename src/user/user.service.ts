import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private logger = new Logger('UserService');
  async create(createUserDto: CreateUserDto) {
    try {
      const existUser = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        }
      }) 
  
      if(existUser) throw new BadRequestException('this email is already')
  
      const user = await this.userRepository.save({
        email: createUserDto.email,
        password: await argon2.hash(createUserDto.password),
      }) 
  
      return { user };
    } catch (error) {
      
      this.logger.error(`An error occurred: ${error.message}`, error.stack)
      return { message: "error on server", error: error}
    }
    
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      }
    })
  }
  
}
