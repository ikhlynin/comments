import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachment.service';
import { AttachmentsController } from './attachment.controller';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [AttachmentsController],
  providers: [AttachmentsService, PrismaService],
})
export class AttachmentModule {}
