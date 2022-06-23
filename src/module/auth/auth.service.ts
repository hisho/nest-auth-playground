import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { compareSync } from 'bcrypt';
import { LoginResponse } from './dto/login-response';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private user: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.user.findByEmail(email);

    if (user && compareSync(password, user.password)) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<LoginResponse> {
    return {
      token: this.jwtService.sign({ uuid: user.uuid }),
    };
  }
}
