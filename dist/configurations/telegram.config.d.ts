import { ConfigService } from "@nestjs/config";
import { TelegrafOptionsFactory } from "nestjs-telegraf";
export declare class TelegramConfig implements TelegrafOptionsFactory {
    private configService;
    constructor(configService: ConfigService);
    createTelegrafOptions(): any;
}
