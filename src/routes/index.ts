import express, { Router } from "express"
import authorsRouter from './api/authors.router'
import { homeApiRouter } from './api/homeApi.router'
import { homeRouter } from './web/home.router'

enum RouteApiVersion {
  V1 = 'v1'
}

class Routes {
  private _router: Router
  private static WEB_ROUTE: string = '/'
  private static API_ROUTE: string = '/api'
  
  constructor() {
    this._router = express.Router()
  }

  private loadRoutes(rootPath: string, routes: Array<express.Router>) {
    routes.forEach((r) => {
        this._router.use(`${rootPath}`, r)
    });
  }

  public loadWebRoutes(routes: Array<express.Router>){
    this.loadRoutes(Routes.WEB_ROUTE, routes)
  }
  
  public loadApiRoutes(version: RouteApiVersion, routes: Array<express.Router>){
    this.loadRoutes(`${Routes.API_ROUTE}/${version}`, routes)
  }

  get router() : Router {
    return this._router
  }
}

const router = new Routes()

//load the routes
router.loadWebRoutes([homeRouter])
router.loadApiRoutes(RouteApiVersion.V1, [homeApiRouter, authorsRouter])

export default router.router

