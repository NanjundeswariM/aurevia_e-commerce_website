import express from "express";

import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getTotalRevenue
} from "../controllers/orderController.mjs";

import protect, {
  adminOnly
} from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/my-orders", protect, getMyOrders);

router.get(
  "/all",
  protect,
  adminOnly,
  getAllOrders
);

router.put(
  "/:orderId/status",
  protect,
  adminOnly,
  updateOrderStatus
);

router.get(
  "/revenue",
  protect,
  adminOnly,
  getTotalRevenue
);

export default router;
