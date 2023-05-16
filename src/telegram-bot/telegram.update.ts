import { Update, Hears, Start, On } from "nestjs-telegraf";
import { Context } from "telegraf";
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid'
// import { actionButtons } from "./telegram.buttons";
import { PhotosService } from "src/postgres/photos/photos.service";
import { UsersService } from "src/postgres/users/users.service";
import { Injectable } from "@nestjs/common";

@Update()
@Injectable()
export class TelegramUpdate{

  // constructor(private readonly telegramController: TelegramController) {}
  constructor(private readonly photosService: PhotosService, private readonly usersService: UsersService) {}

  @Start()
  async startCommand(ctx: Context) {

      const user = await this.usersService.getUser({
        where: {
          telegramId: `${ctx.message.from.id}`
        }
      })
        
      if (user == null) {
        const dataUser = {
          first_name: ctx.message.from.first_name,
          username: ctx.message.from.username || ctx.message.from.first_name,
          telegramId: `${ctx.message.from.id}`,
          password: '',
          role: 'client'
        }

        await this.usersService.create(dataUser).then(result => console.log('result ', result)).catch(error => console.log(error))    
      }

    // await ctx.reply('Привет, что ты хочешь сделать?', actionButtons())
  }  

  @On('photo')
  async hearsHi(ctx) {
    
    const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id
    const axios = require('axios');
    
    var fs = require('fs');
    ctx.telegram.getFileLink(fileId).then(url => {   
      axios({url, responseType: 'stream'}).then(response => {        
        
        const dataPhoto = {
          first_name: ctx.message.from.first_name,
          username: ctx.message.from.username || ctx.message.from.first_name,
          fileName: uuidv4(),
          date: new Date(ctx.message.date * 1000), // UNIX format
          telegramId: ctx.message.from.id
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