import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BannersModule } from './modules/banners/banners.module';
import { NewsModule } from './modules/news/news.module';
import { ProductServicesModule } from './modules/product-services/product-services.module';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    BannersModule,
    NewsModule,
    ProductServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
