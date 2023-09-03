import { Application } from "express"
import routes from "./routes";
import Database from "./database";
import coreMiddleware from './middleware/core';
import securityMiddleware from './middleware/security';
import exceptionsMiddleware from './middleware/exceptions';
import { createExpressServer } from 'routing-controllers';
import AuthorsController from './controllers/api/v1/authors.controller'

export default class App {
  public app: Application;

  constructor() {
    this.app = createExpressServer({
      controllers: [AuthorsController], 
    })
    this.middleware();
    this.database();
    this.routes();
    this.postMiddleware
  }

  get server() {
    return this.app
  } 

  private middleware(): void {
    this.app.use(securityMiddleware)
    this.app.use(coreMiddleware)
  }

  private routes() {
    this.app.use(routes)
  }

  //always leave after routes
  private postMiddleware(): void {
    this.app.use(exceptionsMiddleware)
  }
  
  private database(): void {
    new Database();
  }
}