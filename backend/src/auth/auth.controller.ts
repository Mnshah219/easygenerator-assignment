import { Controller, Post, HttpCode, HttpStatus, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SignInRequestDto } from './dto/signin.dto';
import { SignUpRequestDto } from './dto/signup.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Request() req, @Body() body: SignInRequestDto) {  
    return this.authService.signIn(req.user);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Request() req, @Body() body: SignUpRequestDto) {
    return this.authService.signUp(body);
  }
}