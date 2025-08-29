import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateAttachmentDto } from './dto/attachment.dto';

@Injectable()
export class AttachmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAttachmentDto) {
    return this.prisma.attachment.create({
      data: {
        commentId: dto.commentId,
        path: dto.path,
        mimetype: dto.mimetype,
        size: dto.size,
      },
    });
  }

  async findByComment(commentId: string) {
    return this.prisma.attachment.findMany({
      where: { commentId },
    });
  }
}
