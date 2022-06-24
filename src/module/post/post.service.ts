import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(currentUser: User) {
    return this.prisma.post.findMany({
      where: {
        authorId: currentUser.id,
      },
      include: {
        author: true,
      },
    });
  }

  findOne(uuid: string, isPublished?: boolean) {
    return this.prisma.post.findFirst({
      where: {
        uuid,
        published: isPublished,
      },
      include: {
        author: true,
      },
    });
  }

  create(createPostInput: CreatePostInput, currentUser: User) {
    return this.prisma.post.create({
      data: {
        ...createPostInput,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        author: true,
      },
    });
  }
}
