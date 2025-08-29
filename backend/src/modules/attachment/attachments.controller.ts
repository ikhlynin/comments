import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { CreateAttachmentDto } from './dto/attachment.dto';

@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly service: AttachmentsService) {}

  @Post()
  create(@Body() dto: CreateAttachmentDto) {
    return this.service.create(dto);
  }

  @Get('comment/:id')
  findByComment(@Param('id') commentId: string) {
    return this.service.findByComment(commentId);
  }
}
