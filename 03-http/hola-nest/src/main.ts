import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//import * as httpserver from 'httpserver';//
//import * as httpserver from 'httpserver';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
