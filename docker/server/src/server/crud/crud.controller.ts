import { Get, Post, Delete, Put, Body, Param, Res } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { ICrudService } from './interfaces/crudService.interface'
import { CrudEntity } from './crud.entity'
import { Response } from 'express'

export class CrudController<T extends CrudEntity> {
    constructor(private readonly crudService: ICrudService<T>) {}

    @Get()
    @ApiResponse({ status: 200, description: 'OK' })
    async getAll(@Body('query') query: string, @Res() res: Response): Promise<any> {
        const response = await this.crudService.getAll(query)
        return res.status(response.status).send(response)
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Entity retrieved successfully' })
    @ApiResponse({ status: 404, description: 'Entity does not exist' })
    async getOne(@Param('id') id: number, @Res() res: Response): Promise<any> {
        const response = await this.crudService.getOne(id)
        return res.status(response.status).send(response)
    }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async insert(@Body() entity: T, @Res() res: Response): Promise<any> {
        const response = await this.crudService.insert(entity)
        return response
    }

    @Put()
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 200, description: 'Entity deleted successfully' })
    async update(@Param('id') id: number, @Body() data: T, @Res() res: Response): Promise<any> {
        const response = await this.crudService.update(id, data)
        return response
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Entity updated successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async delete(@Param('id') id: number, @Res() res: Response) {
        const response = await this.crudService.delete(id)
        return res.status(response.status).send(response)
    }
}
