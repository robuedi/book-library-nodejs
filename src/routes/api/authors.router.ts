//express imports
import express = require('express');
const router = express.Router();

//controllers
import { AuthorsController } from "../../controllers/api/authors.controller";

// Set the common part of the path for the routes in this router
const base = '/authors'
const authorsController = new AuthorsController()

//Routes
router.get(`${base}`, authorsController.index)
router.post(`${base}`, authorsController.create)
router.put(`${base}/:id`, authorsController.update)
router.delete(`${base}/:id`, authorsController.delete)
router.get(`${base}/:id`, authorsController.getOne)

export default router