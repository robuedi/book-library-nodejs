import { Application } from "express"
import express = require("express")
import { addressRouter} from './api/addresses.router'
import { homeApiRouter } from './api/homeApi.router'
import { homeRouter } from './home.router'

export default class Routes {
  public app: Application
  
  constructor(app: Application) {
    this.app = app
    this.loadRoutes('/', [homeRouter])
    this.loadRoutes('/api', [homeApiRouter, addressRouter])
  }

  private loadRoutes(rootPath: string, routes: Array<express.Router>) {
    routes.forEach((r) => {
        this.app.use(`${rootPath}`, r)
    });
  }
}

