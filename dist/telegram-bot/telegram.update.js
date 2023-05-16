"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramUpdate = void 0;
const nestjs_telegraf_1 = require("nestjs-telegraf");
const telegraf_1 = require("telegraf");
const path_1 = require("path");
const uuid_1 = require("uuid");
const photos_service_1 = require("../postgres/photos/photos.service");
const users_service_1 = require("../postgres/users/users.service");
const common_1 = require("@nestjs/common");
let TelegramUpdate = class TelegramUpdate {
    constructor(photosService, usersService) {
        this.photosService = photosService;
        this.usersService = usersService;
    }
    async startCommand(ctx) {
        const user = await this.usersService.getUser({
            where: {
                telegramId: `${ctx.message.from.id}`
            }
        });
        if (user == null) {
            const dataUser = {
                first_name: ctx.message.from.first_name,
                username: ctx.message.from.username || ctx.message.from.first_name,
                telegramId: `${ctx.message.from.id}`,
                password: '',
                role: 'client'
            };
            await this.usersService.create(dataUser).then(result => console.log('result ', result)).catch(error => console.log(error));
        }
    }
    async hearsHi(ctx) {
        const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
        const axios = require('axios');
        var fs = require('fs');
        ctx.telegram.getFileLink(fileId).then(url => {
            axios({ url, responseType: 'stream' }).then(response => {
                const dataPhoto = {
                    first_name: ctx.message.from.first_name,
                    username: ctx.message.from.username || ctx.message.from.first_name,
                    fileName: (0, uuid_1.v4)(),
                    date: new Date(ctx.message.date * 1000),
                    telegramId: ctx.message.from.id
                };
                this.photosService.create(dataPhoto).then(result => console.log('result ', result)).catch(error => console.log(error));
                this.photosService.getAll().then(result => console.log('getall', result));
                const dest = (0, path_1.join)(process.cwd(), `./src/photo/${dataPhoto.fileName}.jpg`);
                const file = fs.createWriteStream(dest);
                response.data.pipe(file)
                    .on('finish', () => console.log('finished'))
                    .on('error', e => fs.unlink(dest, console.log(e.message)));
            });
        });
    }
};
__decorate([
    (0, nestjs_telegraf_1.Start)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "startCommand", null);
__decorate([
    (0, nestjs_telegraf_1.On)('photo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TelegramUpdate.prototype, "hearsHi", null);
TelegramUpdate = __decorate([
    (0, nestjs_telegraf_1.Update)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [photos_service_1.PhotosService, users_service_1.UsersService])
], TelegramUpdate);
exports.TelegramUpdate = TelegramUpdate;
//# sourceMappingURL=telegram.update.js.map