import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';


async function start() {
  const PORT = process.env.PORT ?? 5000;
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error'],
  });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
      .setTitle('Xususiy klinika project')
      .setDescription('Xususiy klinika REST API')
      .setVersion('1.0')
      .addTag('NestJS, CRUD, swagger, sendMail, bot, SMS, tokens, Validation')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
  });
}
start();
