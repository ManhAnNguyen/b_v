import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BannersModule } from './modules/banners/banners.module';
import { NewsModule } from './modules/news/news.module';

import * as dotenv from 'dotenv';
import { PageMiddleware } from './common/middlewares/page.middleware';
import { EventsModule } from './modules/events/events.module';
import { AuthModule } from './modules/auth/auth.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    BannersModule,
    NewsModule,
    EventsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PageMiddleware).forRoutes({
      path: '/news',
      method: RequestMethod.GET,
    });
  }
}
