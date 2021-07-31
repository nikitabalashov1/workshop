import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { NewsModule } from './news/news.module'
import { AppController } from './app.controller'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
    imports: [
        ConfigModule.forRoot(),
        NewsModule,
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            models: [],
            autoLoadModels: true,
            synchronize: true,
        }),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
