//express imports
import express = require('express');
export const homeApiRouter = express.Router();

//controllers
import { HomeApiController } from "../../controllers/api/homeApi.controller";

// Set the common part of the path for the routes in this router
const base = ''
const homeApiController = new HomeApiController()

//Routes
homeApiRouter.get(`${base}`, homeApiController.index)

