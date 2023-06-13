"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const photos_module_1 = require("./postgres/photos/photos.module");
const nestjs_1 = require("@adminjs/nestjs");
const AdminJSTypeorm = require("@adminjs/typeorm");
const adminjs_1 = require("adminjs");
const telegram_module_1 = require("./telegram-bot/telegram.module");
const telegram_service_1 = require("./telegram-bot/telegram.service");
const telegram_controller_1 = require("./telegram-bot/telegram.controller");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const users_module_1 = require("./postgres/users/users.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const configurations_1 = require("./configurations");
const database_config_1 = require("./configurations/database.config");
const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
};
const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
};
adminjs_1.default.registerAdapter({
    Resource: AdminJSTypeorm.Resource,
    Database: AdminJSTypeorm.Database,
});
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configurations_1.default]
            }),
            nestjs_1.AdminModule.createAdminAsync({
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
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useClass: database_config_1.DatabaseConfig
            }),
            photos_module_1.PhotosModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            telegram_module_1.TelegramModule,
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: '/images',
                rootPath: (0, path_1.join)(__dirname, '..', 'src/photo'),
                serveStaticOptions: {
                    index: false,
                },
            }),
        ],
        controllers: [telegram_controller_1.TelegramController],
        providers: [telegram_service_1.TelegramService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map