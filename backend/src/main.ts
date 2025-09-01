import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      `${process.env.FRONTEND_URL}`,
      'https://frontend-production-0da9.up.railway.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  console.log(`Starting server on port ${process.env.BACKEND_PORT}`);
  await app.listen(process.env.BACKEND_PORT, '0.0.0.0');
}
bootstrap();
