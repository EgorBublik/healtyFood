import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { TelegramUpdate } from './telegram.update';
const sessions = new LocalSession({database: 'sesion_db.json'})
import { PhotosModule } from 'src/postgres/photos/photos.module';
import { UsersModule } from 'src/postgres/users/users.module';

@Module({
  imports: [
    PhotosModule,
    UsersModule,
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: ''
    })
  ],
  controllers: [],
  providers: [TelegramService, TelegramUpdate],

})

export class TelegramModule {}
