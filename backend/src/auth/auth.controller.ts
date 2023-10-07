import { Controller, Post, HttpCode, HttpStatus, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Request() req, @Body() body: SignInRequestDto) {
    return this.authService.signIn(req.user);
  }
}