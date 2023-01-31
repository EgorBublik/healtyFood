import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { TelegramBotService } from './telegram-bot/telegram-bot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosModule } from './postgres/photos.module';
const sessions = new LocalSession({database: 'sesion_db.json'})
import { AdminModule } from '@adminjs/nestjs'
import { Photo } from './postgres/entities/photo.entity';
import * as AdminJSTypeorm from '@adminjs/typeorm'
import AdminJS from 'adminjs'
 
const DEFAULT_ADMIN = {
  email: '',
  password: '',
}

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
})

@Module({
  imports: [
    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret'
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret'
        },
      }),
    }),
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: ''
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '',
      password: '',
      database: 'healthyfood',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PhotosModule,
    
  ],
  controllers: [],
  providers: [TelegramBotService],
})
export class AppModule {}
