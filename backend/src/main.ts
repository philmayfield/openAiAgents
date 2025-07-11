import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3001;
  app.enableCors();
  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}`);
}

bootstrap();
