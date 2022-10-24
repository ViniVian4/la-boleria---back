import express from "express";
import { postOrders, getOrders, getOrderId, getOrderClientId } from "../controllers/ordersController.js";
import validateOrder from "../middlewares/ordersMiddleware.js";

const router = express.Router();

router.post('/order', validateOrder, postOrders);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderId);
router.get('/clients/:id/orders', getOrderClientId);

export default router;