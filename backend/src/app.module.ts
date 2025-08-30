import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './modules/comments/comments.module';
import { AttachmentModule } from './modules/attachment/attachments.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        setHeaders: (res, path) => {
          const isImage = /\.(jpg|jpeg|png|gif)$/.test(path);
          if (!isImage) {
            res.setHeader('Content-Disposition', 'attachment');
          }
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    CommentsModule,
    AttachmentModule,
  ],
})
export class AppModule {}
