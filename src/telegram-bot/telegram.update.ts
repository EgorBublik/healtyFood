import { Update, Hears, Start, On } from "nestjs-telegraf";
import { Context } from "telegraf";
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid'
// import { TelegramController } from 'src/telegram-bot/telegram.controller';
import { PhotosService } from "src/postgres/photos/photos.service";
import { Injectable } from "@nestjs/common";

@Update()
@Injectable()
export class TelegramUpdate{

  // constructor(private readonly telegramController: TelegramController) {}
  constructor(private readonly photosService: PhotosService) {}

  @Start()
  async startCommand(ctx: Context) {
      await ctx.reply('hi, friend! you are awesome')   
  }  

  @On('photo')
  async hearsHi(ctx) {
    
    const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id
    const axios = require('axios');
    
    console.log(ctx.message.photo)
    var fs = require('fs');
    ctx.telegram.getFileLink(fileId).then(url => {   
      axios({url, responseType: 'stream'}).then(response => {        
        
        const dataPhoto = {
          firstName: ctx.message.from.first_name,
          lastName: ctx.message.from.last_name,
          username: ctx.message.from.username,
          fileName: uuidv4(),
          date: new Date(ctx.message.date * 1000) // UNIX format
        }

        this.photosService.create(dataPhoto).then(result => console.log('result ', result)).catch(error => console.log(error))

        this.photosService.getAll().then(result => console.log('getall', result))
        const dest = join(process.cwd(), `./src/photo/${dataPhoto.fileName}.jpg`)
        const file = fs.createWriteStream(dest);

        response.data.pipe(file)
          .on('finish', () => console.log('finished')/* File is saved. */)
          .on('error', e => fs.unlink(dest, console.log(e.message))/* An error has occured */)

      });
    })
            
  }
}