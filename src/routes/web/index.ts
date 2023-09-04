//express imports
import express = require('express');

//controllers
import { HomeController } from "../../controllers/home.controller";

//Routes
export const homeRouter = express.Router();
const homeController = new HomeController()
homeRouter.get('', homeController.index)