import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/schemas/user.schema';
import { SignUpRequestDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    // add hashing logic
    const isPassValid = bcrypt.compare(pass, user?.password);
    if (user && isPassValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: UserDocument) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }

  async signUp(user: SignUpRequestDto) {
    const existingUser = await this.userService.findOne(user.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists!');
    }
    return this.userService.create(user);
  }
}
