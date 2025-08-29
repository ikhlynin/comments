import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './modules/comments/comments.module';
import { AttachmentModule } from './modules/attachment/attachments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    CommentsModule,
    AttachmentModule,
  ],
})
export class AppModule {}
