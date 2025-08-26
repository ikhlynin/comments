import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './modules/comments/comments.module';
import { FilesModule } from './modules/files/files.module';
import { CaptchaModule } from './modules/captcha/captcha.module';
import { UsersModule } from './modules/user/user.module';
import { AttachmentModule } from './modules/attachment/attachment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    CommentsModule,
    FilesModule,
    CaptchaModule,
    UsersModule,
    AttachmentModule,
  ],
})
export class AppModule {}
