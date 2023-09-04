import { Router } from "express"
import IResourceController from "../../controllers/resource.controller.interface"
import ResourceRouter from './resourceRouter.resource.service'

export default class ResourceRouterFacade {
    private constructor(){}

    static make(baseRoute: string, controller: IResourceController, except: string[] = []) : Router {
        const resourceRouter = new ResourceRouter(baseRoute, controller)
        //build our resource router
        !except.includes('index') && resourceRouter.index()
        !except.includes('show') && resourceRouter.show()
        !except.includes('store') && resourceRouter.store()
        !except.includes('update') && resourceRouter.update()
        !except.includes('delete') && resourceRouter.delete()

        return resourceRouter.router
    }
}

