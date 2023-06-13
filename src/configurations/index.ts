import * as LocalSession from 'telegraf-session-local';
const sessions = new LocalSession({database: 'sesion_db.json'})

export default () => ({
    port: process.env.PORT,
    database: {
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
    },
    telegram: {
        middlewares: [sessions.middleware()],
        token: process.env.TELEGRAM_TOKEN
    } 
})