import ResourceRouterFacade from '../../services/utils/apiRouter.resource.service.facade'

import { AuthorsController } from "../../controllers/api/v1/authors.controller";

enum RouteApiVersion {
    V1 = 'v1'
}

  
const authorsRouter = ResourceRouterFacade.make(`/${RouteApiVersion.V1}/authors`, new AuthorsController())

export default [
    authorsRouter
]