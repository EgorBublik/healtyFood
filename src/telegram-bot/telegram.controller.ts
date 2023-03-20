import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { CreatePhotoDto } from 'src/postgres/photos/dto/create-photo.dto';
import { PhotosService } from 'src/postgres/photos/photos.service';
import { Context, Telegraf } from 'telegraf';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}
  // constructor(@InjectBot() private bot: Telegraf<Context>) {}
  // constructor(private readonly photosService: PhotosService) {}
  
  // @Post()
  //   public create(@Body() createPhotoDto: CreatePhotoDto) {
  //   return this.photosService.create(createPhotoDto);
  // }

  // @Get()
  // getAll() {
  //   return this.photosService.getAll();
  // }

}
