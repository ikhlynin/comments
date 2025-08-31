import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CaptchaModule } from '../captcha/captcha.module';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService],
  imports: [CaptchaModule],
})
export class CommentsModule {}
