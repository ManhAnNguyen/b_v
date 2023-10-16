import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5555;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => console.log(`server up in port :${port}`));
}
bootstrap();