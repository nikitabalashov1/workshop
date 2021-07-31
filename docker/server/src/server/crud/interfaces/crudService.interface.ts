export interface ICrudService<T> {
    getOne(id: number): any
    getAll(query: any): Promise<any>
    insert(entity: T): Promise<number>
    update(id: any, data: any): Promise<T>
    delete(id: number)
    destroyAll(): Promise<any>
}
