import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
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
        password,
        email,
      },
    });
  }
}
