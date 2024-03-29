import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosModule } from './postgres/photos/photos.module';
import { AdminModule } from '@adminjs/nestjs'
import { Photo } from './postgres/photos/entities/photo.entity';
import * as AdminJSTypeorm from '@adminjs/typeorm'
import AdminJS from 'adminjs'
import { TelegramModule } from './telegram-bot/telegram.module';
import { TelegramService } from './telegram-bot/telegram.service';
import { TelegramController } from './telegram-bot/telegram.controller';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './postgres/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configurations from './configurations';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './configurations/database.config';
 
// const database = configurations

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
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
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations]
    }),
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig
    }),
    PhotosModule,   
    UsersModule,
    AuthModule,
    TelegramModule,
    ServeStaticModule.forRoot({
      serveRoot: '/images',
      rootPath: join(__dirname, '..', 'src/photo'),
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  controllers: [TelegramController],
  providers: [TelegramService],
})
export class AppModule {}
   