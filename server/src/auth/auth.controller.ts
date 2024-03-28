import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() request: Request) {
    return this.authService.login(request);
  }

  @Get('logout')
  logout(@Req() request: Request) {
    return this.authService.logout(request);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Req() request: Request) {
    return request.user;
  }
}
