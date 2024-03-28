import { Request } from 'express';
import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    const passwordMatch = await this.passworMatch(password, user.password);

    if (!passwordMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const { password: _, ...result } = user;

    return result;
  }

  async passworMatch(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async login(request: Request) {
    return {
      message: 'Login successful',
      statusCode: HttpStatus.OK,
      user: request.user,
    };
  }

  async logout(@Req() request: Request) {
    request.session.destroy(() => {
      return {
        message: 'Logout successful',
        statusCode: HttpStatus.OK,
      };
    });
  }
}
