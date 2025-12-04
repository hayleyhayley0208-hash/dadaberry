import { Handler } from '@netlify/functions';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../../dist/app.module';
import * as express from 'express';
import serverless from 'serverless-http';
import { join } from 'path';

let cachedServer: any;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express.default();
    
    // Serve static files from imgs directory
    expressApp.use('/imgs', express.static(join(__dirname, '..', '..', 'imgs')));
    
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    await nestApp.init();
    cachedServer = serverless(expressApp);
  }
  return cachedServer;
}

export const handler: Handler = async (event, context) => {
  const server = await bootstrap();
  return server(event, context);
};

