import { Sequelize } from "sequelize-typescript";
import  config from "../config/config";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      database: config.DB_DATABASE,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      host: config.DB_HOST,
      dialect: config.DB_DIALECT,
      pool: {
        max: config.DB_POOL_MAX,
        min: config.DB_POOL_MIN,
        acquire: config.DB_POOL_ACQUIRE,
        idle: config.DB_POOL_IDLE
      },
      models: []
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the Database:", err);
      });
  }
}

export default Database
