import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Get Express instance and add static middleware
  const expressInstance = app.getHttpAdapter().getInstance();
  expressInstance.use('/imgs', express.static(join(process.cwd(), 'imgs')));
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`📁 Images served from: ${join(process.cwd(), 'imgs')}`);
}
bootstrap();
