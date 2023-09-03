import express, { Application } from "express";
import config from "./config/config";
import App from "./app";

// const server: Application = express();
const app: App = new App(express());

app.server
  .listen(config.APP_PORT, "localhost", function () {
    console.log(`Server is running on port ${config.APP_PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
