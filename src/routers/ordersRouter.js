import express from "express";
import { postOrders } from "../controllers/ordersController.js";
import validateOrder from "../middlewares/ordersMiddleware.js";

const router = express.Router();

router.post('/order', validateOrder, postOrders);

export default router;