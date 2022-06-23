import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from '../../prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUuid(uuid: string) {
    return await this.prisma.user.findUnique({
      where: { uuid },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(createUserInput: CreateUserInput) {
    const { email, name, password } = createUserInput;

    const hasUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (hasUser) {
      throw new HttpException(
        '既に使用されているメールアドレスです。',
        HttpStatus.CONFLICT,
      );
    }

    return await this.prisma.user.create({
      data: {
        name,
        password: await hash(password, 10),
        email,
      },
    });
  }
}
