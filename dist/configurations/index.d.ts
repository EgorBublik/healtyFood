declare const _default: () => {
    port: string;
    database: {
        type: string;
        host: string;
        port: string;
        username: string;
        password: string;
        database: string;
        autoLoadEntities: boolean;
        synchronize: boolean;
    };
    telegram: {
        middlewares: ((ctx: import("telegraf").Context<import("typegram").Update>, next: () => Promise<void>) => Promise<void>)[];
        token: string;
    };
};
export default _default;
