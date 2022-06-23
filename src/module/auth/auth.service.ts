import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { compareSync } from 'bcrypt';
import { Token } from './entities/token.entity';
import { UserService } from '../user/user.service';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly user: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: LoginUserInput['email'],
    password: LoginUserInput['password'],
  ): Promise<User | null> {
    const user = await this.user.findByEmail(email);

    if (user && compareSync(password, user.password)) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<Token> {
    return {
      token: this.jwtService.sign({ uuid: user.uuid }),
    };
  }
}
