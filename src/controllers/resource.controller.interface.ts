export default interface IResourceController {
    index?<T>(...params: any[]): T 
    index?<T>(...params: any[]): Promise<T>

    show?<T>(...params: any[]): Promise<T>
    show?<T>(...params: any[]): T

    store?<T>(...params: any[]): Promise<T>
    store?<T>(...params: any[]): T

    update?<T>(...params: any[]): Promise<T>
    update?<T>(...params: any[]): T

    delete?<T>(...params: any[]): Promise<T>
    delete?<T>(...params: any[]): T
}
