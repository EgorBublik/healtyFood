import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TelegrafOptionsFactory } from "nestjs-telegraf";

@Injectable()
export class TelegramConfig implements TelegrafOptionsFactory {
    constructor( private configService: ConfigService) {}

    createTelegrafOptions() {
        return this.configService.get('telegram')
    }
}