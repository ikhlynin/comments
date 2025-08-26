import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/comment.dto';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        text: dto.text,
        captcha: dto.captcha,
        userId: dto.userId,
        parentId: dto.parentId,
      },
    });
  }

  async findAll(page = 1, take = 25) {
    return this.prisma.comment.findMany({
      where: { parentId: null },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * take,
      take,
      include: { replies: true, user: true },
    });
  }

  async findById(id: string) {
    return this.prisma.comment.findUnique({
      where: { id },
      include: { replies: true, user: true },
    });
  }
}
