import { Application } from "express"
import routes from "./routes";
import Database from "./database";
import coreMiddleware from './middleware/core';
import securityiddleware from './middleware/security';

export default class App {
  public app: Application;

  constructor(app: Application) {
    this.app = app
    this.middleware();
    this.database();
    this.routes();
  }

  private middleware(): void {
    this.app.use(securityiddleware)
    this.app.use(coreMiddleware)
  }

  private routes() {
    this.app.use(routes)
  }

  private database(): void {
    new Database();
  }
}