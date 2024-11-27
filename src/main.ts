import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MultiExceptionFilter } from './constants/filterException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new MultiExceptionFilter());

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`🚀 Aplicación corriendo en: http://localhost:${PORT}`);
}
bootstrap();
