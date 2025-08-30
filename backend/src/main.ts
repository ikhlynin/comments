import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('DB_URL:', process.env.DB_URL);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:
      process.env.FRONTEND_URL ||
      'https://frontend-production-0da9.up.railway.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  const port = process.env.PORT || 5000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
