import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/comment.dto';
import { CaptchaService } from '../captcha/captcha.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('comments')
export class CommentsController {
  constructor(
    private commentsService: CommentsService,
    private captchaService: CaptchaService,
  ) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('attachment', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) =>
          cb(null, `${Date.now()}${extname(file.originalname)}`),
      }),
      limits: { fileSize: 100 * 1024 },
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype.startsWith('image/') ||
          file.mimetype === 'text/plain'
        ) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      },
    }),
  )
  async create(
    @Body()
    body: CreateCommentDto & { captchaText?: string; sessionId?: string },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!body.captchaText || !body.sessionId) {
      throw new BadRequestException('CAPTCHA is required');
    }

    const isCaptchaValid = await this.captchaService.validate(
      body.sessionId,
      body.captchaText,
    );

    if (!isCaptchaValid) {
      throw new BadRequestException('Invalid CAPTCHA');
    }
    if (file) {
      body.attachments = [
        {
          path: `/uploads/${file.filename}`,
          mimetype: file.mimetype,
          size: file.size,
        },
      ];
    }
    return this.commentsService.create(body);
  }

  @Get()
  async findAll(
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'asc' | 'desc',
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '25',
  ) {
    return this.commentsService.findAll({
      sortBy,
      order,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  }
}
