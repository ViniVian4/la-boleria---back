import express from "express";
import { postOrders, getOrders } from "../controllers/ordersController.js";
import validateOrder from "../middlewares/ordersMiddleware.js";

const router = express.Router();

router.post('/order', validateOrder, postOrders);
router.get('/orders', getOrders);

export default router;