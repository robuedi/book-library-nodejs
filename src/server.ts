import express, { Application } from "express";
import  config from "./config/config";
import App from "./app";

const server: Application = express();
const app: App = new App(server);
const PORT: number = config.APP_PORT ? config.APP_PORT : 3001;

server
  .listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
