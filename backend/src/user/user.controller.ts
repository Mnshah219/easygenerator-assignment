import { Controller, Get, HttpCode, HttpStatus, Request, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor() {}

  @HttpCode(HttpStatus.OK)
  @Get('/profile')
  findById(@Request() req) {  
    return req.user;
  }
}