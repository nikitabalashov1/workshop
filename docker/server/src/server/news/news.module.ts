import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { NewsController } from './news.controller'
import { NewsService } from './news.service'
import { News } from './news.model'

@Module({
    controllers: [NewsController],
    providers: [NewsService],
    imports: [SequelizeModule.forFeature([News])],
    exports: [NewsService, SequelizeModule],
})
export class NewsModule {}
