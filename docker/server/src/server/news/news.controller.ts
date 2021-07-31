import { Controller } from '@nestjs/common'
import { NewsService } from './news.service'
import { INews } from './interfaces/news.interface'
import { CrudController } from '../crud/crud.controller'
import { ApiTags } from '@nestjs/swagger'

@Controller('news')
@ApiTags('news')
export class NewsController extends CrudController<INews> {
    constructor(private readonly newsService: NewsService) {
        super(newsService)
    }
}
