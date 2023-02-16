import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { TelegramUpdate } from './telegram.update';
const sessions = new LocalSession({database: 'sesion_db.json'})
import { PhotosModule } from 'src/postgres/photos.module';
import { PhotosService } from 'src/postgres/photos.service';

@Module({
  imports: [
    PhotosModule,
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: '5613162680:AAGqjmrTc1lFg7JJct1b5jFsoqbJUBycr90'
    })
  ],
  controllers: [],
  providers: [TelegramService, TelegramUpdate],

})

export class TelegramModule {}
