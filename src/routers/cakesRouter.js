import express from "express";
import { postCakes } from '../controllers/cakesController.js';
import validateCake from "../middlewares/cakesMiddleware.js";

const router = express.Router();

router.post('/cakes', validateCake, postCakes);

export default router;