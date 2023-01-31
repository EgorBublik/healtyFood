import { Injectable } from '@nestjs/common';
import { Start, Update, Help, Hears, On, Message} from 'nestjs-telegraf';
import { Context } from 'telegraf';
import fs  from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid'




@Update()
@Injectable()
export class TelegramBotService {
    httpService: any;

    @Start()
    async startCommand(ctx: Context) {
        await ctx.reply('hi, friend! you are awesome')   
    } 

    @Help()
    async helpCommand(ctx: Context) {
      await ctx.reply('Write me your dishes or upload file');
    }

    @Hears('1')
    async hearsHi1(ctx: Context) {
      console.log(ctx.message)  
      await ctx.reply(
            'Choose1'
          )
    }

    @On('sticker')
    async on1(ctx: Context) {
      console.log('1234')
        await ctx.reply('👍');
    }

    @On('photo')
    async hearsHi(ctx) {
      
      const fileId = ctx.message.photo[0].file_id
      const axios = require('axios');
      
      var fs = require('fs');
      ctx.telegram.getFileLink(fileId).then(url => {   
        console.log("LOG URL " + url); 
        axios({url, responseType: 'stream'}).then(response => {
                console.log(response)
                const dest = join(process.cwd(), `./src/photo/${uuidv4()}.jpg`)
                const file = fs.createWriteStream(dest);
                response.data.pipe(file)
                             .on('finish', () => console.log('finished')/* File is saved. */)
                             .on('error', e => fs.unlink(dest, console.log(e.message))/* An error has occured */)
                    });
                // })
                
    })
             
      await ctx.reply(
            'Choose'
          )
    }

    

    @Hears('123') 
    async hears123(ctx: Context) {
        await ctx.reply('Choose')
    }

}
