import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { News } from './news.model'
import { CrudService } from '../crud/crud.service'

@Injectable()
export class NewsService extends CrudService<News> {
    constructor(
        @InjectModel(News)
        private newsModel: typeof News
    ) {
        super(newsModel)
    }
}
