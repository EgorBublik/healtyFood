"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramModule = void 0;
const common_1 = require("@nestjs/common");
const telegram_service_1 = require("./telegram.service");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const LocalSession = require("telegraf-session-local");
const telegram_update_1 = require("./telegram.update");
const sessions = new LocalSession({ database: 'sesion_db.json' });
const photos_module_1 = require("../postgres/photos/photos.module");
const users_module_1 = require("../postgres/users/users.module");
let TelegramModule = class TelegramModule {
};
TelegramModule = __decorate([
    (0, common_1.Module)({
        imports: [
            photos_module_1.PhotosModule,
            users_module_1.UsersModule,
            nestjs_telegraf_1.TelegrafModule.forRoot({
                middlewares: [sessions.middleware()],
                token: ''
            })
        ],
        controllers: [],
        providers: [telegram_service_1.TelegramService, telegram_update_1.TelegramUpdate],
    })
], TelegramModule);
exports.TelegramModule = TelegramModule;
//# sourceMappingURL=telegram.module.js.map