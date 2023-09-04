import express, { Router } from "express"
import apiRoutes from './api'
import { homeRouter } from './web'

enum RoutesBase {
  WEB = '/',
  API = '/api'
}

class Routes {
  private _router: Router
  
  constructor() {
    this._router = express.Router()
  }

  public loadRoutes(rootPath: RoutesBase, routes: Array<express.Router>) {
    routes.forEach((route) => {
        this._router.use(`${rootPath}`, route)
    });
  }

  get router() : Router {
    return this._router
  }
}

const router = new Routes()

//load the routes
router.loadRoutes(RoutesBase.WEB, [homeRouter])
router.loadRoutes(RoutesBase.API, apiRoutes)

export default router.router

