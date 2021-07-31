import { Injectable, BadGatewayException, NotFoundException } from '@nestjs/common'
import { ICrudService } from './interfaces/crudService.interface'
import { CrudEntity } from './crud.entity'
import { calculateLimitAndOffset, paginate } from 'paginate-info'

export interface Response<T> {
    status: number
    message: string
    data?: T
    meta?: T
}

@Injectable()
export class CrudService<T extends CrudEntity> implements ICrudService<T> {
    constructor(private readonly genericModel: any) {}

    async getOne(id: number): Promise<any> {
        try {
            const item = await this.genericModel.findOne({ where: { id } })
            if (item) {
                const response: Response<T> = {
                    status: 200,
                    message: 'Entity retrieved successfully',
                    data: item,
                }
                return response
            } else {
                const response: Response<T> = {
                    status: 404,
                    message: 'Entity does not exist',
                }
                return response
            }
        } catch (error) {
            throw new BadGatewayException(error)
        }
    }

    async getAll(query: any): Promise<any> {
        try {
            let currentPage
            let pageLimit
            if (query) {
                currentPage = query.currentPage
                pageLimit = query.pageLimit
            }
            if (currentPage === undefined) {
                const items = await this.genericModel.findAll()
                const response: Response<T> = {
                    status: 200,
                    message: 'OK',
                    data: items,
                }
                return response
            } else {
                const { limit, offset } = calculateLimitAndOffset(currentPage, pageLimit)
                const { rows, count } = await this.genericModel.findAndCountAll({ limit, offset })
                const meta = paginate(currentPage, count, rows, pageLimit)
                const response: Response<T> = {
                    status: 200,
                    message: 'OK',
                    data: rows,
                    meta,
                }
                return response
            }
        } catch (error) {
            throw new BadGatewayException(error)
        }
    }

    async insert(data: any): Promise<any> {
        try {
            const item = await this.genericModel.create(data)
            const response: Response<T> = {
                status: 201,
                message: 'The record has been successfully created.',
                data: item,
            }
            return response
        } catch (error) {
            throw new BadGatewayException(error)
        }
    }

    async delete(id: number) {
        try {
            const result = await this.genericModel.destroy({ where: { id } })
            const response: Response<T> = {
                status: 202,
                message: 'Entity deleted successfully.',
                data: result,
            }
            return response
        } catch (error) {
            throw new BadGatewayException(error)
        }
    }

    async update(id: any, data: any): Promise<any> {
        try {
            const result = await this.genericModel.update(data, { where: { id } })
            const response: Response<T> = {
                status: 202,
                message: 'Entity updated successfully',
                data: result,
            }
            return response
        } catch (error) {
            throw new BadGatewayException(error)
        }
    }

    async destroyAll(): Promise<any> {
        try {
            const result = await this.genericModel.destroy({ truncate: true })
            return {
                status: 202,
                data: result,
            }
        } catch (error) {
            throw new BadGatewayException(error)
        }
    }
}
