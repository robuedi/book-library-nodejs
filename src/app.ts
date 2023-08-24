import express, { Application } from "express"
import cors, { CorsOptions } from "cors"
import Routes from "./routes";
import Database from "./db";

export default class App {
  public app: Application;

  constructor(app: Application) {
    this.app = app
    this.config();
    this.syncDatabase();
    this.routes();
  }

  private config(): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost"
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes() {
    new Routes(this.app)
  }

  private syncDatabase(): void {
    const db = new Database();
    db.sequelize?.sync();
  }
}
