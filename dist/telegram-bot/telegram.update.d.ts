import { Context } from "telegraf";
import { PhotosService } from "src/postgres/photos/photos.service";
import { UsersService } from "src/postgres/users/users.service";
export declare class TelegramUpdate {
    private readonly photosService;
    private readonly usersService;
    constructor(photosService: PhotosService, usersService: UsersService);
    startCommand(ctx: Context): Promise<void>;
    hearshi(ctx: any): Promise<void>;
    hearsHi(ctx: any): Promise<void>;
}
