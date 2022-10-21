import express from "express";
import { postClients } from '../controllers/clientsController.js'
import validateClient from '../middlewares/clientMiddleware.js'

const router = express.Router();

router.post('/clients', validateClient, postClients);

export default router;