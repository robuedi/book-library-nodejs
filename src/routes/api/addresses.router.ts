//express imports
import express = require('express');
export const addressRouter = express.Router();

//controllers
import { AddressesController } from "../../controllers/api/addresses.controller";

// Set the common part of the path for the routes in this router
const base = '/addresses'
const addressesController = new AddressesController()

//Routes
addressRouter.get(`${base}`, addressesController.index)
addressRouter.post(`${base}`, addressesController.create)
addressRouter.put(`${base}/:id`, addressesController.update)
addressRouter.delete(`${base}/:id`, addressesController.delete)
addressRouter.get(`${base}/:id`, addressesController.getOne)

