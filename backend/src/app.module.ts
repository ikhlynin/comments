import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './modules/comments/comments.module';
import { FilesModule } from './modules/files/files.module';
import { CaptchaModule } from './modules/captcha/captcha.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'comments_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CommentsModule,
    FilesModule,
    CaptchaModule,
  ],
})
export class AppModule {}
