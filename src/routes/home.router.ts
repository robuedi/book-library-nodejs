//express imports
import express = require('express');
export const homeRouter = express.Router();

//controllers
import { HomeController } from "../controllers/home.controller";

// Set the common part of the path for the routes in this router
const base = ''
const homeController = new HomeController()

//Routes
homeRouter.get(`${base}`, homeController.index)

