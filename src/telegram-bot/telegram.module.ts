import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramUpdate } from './telegram.update';
import { PhotosModule } from 'src/postgres/photos/photos.module';
import { UsersModule } from 'src/postgres/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TelegramConfig } from 'src/configurations/telegram.config';

@Module({
  imports: [
    ConfigModule,
    PhotosModule,
    UsersModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TelegramConfig
    })
  ],
  controllers: [],
  providers: [TelegramService, TelegramUpdate],

})

export class TelegramModule {}
