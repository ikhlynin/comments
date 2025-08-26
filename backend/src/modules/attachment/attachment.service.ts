import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateAttachmentDto } from './dto/attachment.dto';

@Injectable()
export class AttachmentsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateAttachmentDto) {
    return this.prisma.attachment.create({
      data: dto,
    });
  }

  findByComment(commentId: string) {
    return this.prisma.attachment.findMany({
      where: { commentId },
    });
  }
}
