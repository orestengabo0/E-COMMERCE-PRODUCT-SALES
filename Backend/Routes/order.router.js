const express = require("express");
const { authenticate, authorize } = require("../Middlewares/authentication");
const {
  createOrder,
  getOrders,
  cancelOrder,
  getOrderStatus,
  getAllOrdersAsAdmin,
  updateOrderStatus,
  getOrderById,
} = require("../Controllers/Order.controller");
const orderRoute = express.Router();

orderRoute.get(
  "/admin/orders",
  authenticate,
  authorize(["admin"]),
  getAllOrdersAsAdmin
);
orderRoute.get("/user/myOrders", authenticate, getOrders);
orderRoute.get(
  "/admin/orders/:orderId",
  authenticate,
  authorize(["admin"]),
  getOrderById
);
orderRoute.get("/user/myOrders/:orderId/status", authenticate, getOrderStatus);
orderRoute.post("/create", authenticate, createOrder);
orderRoute.delete("/user/myOrders/:orderId/cancel", authenticate, cancelOrder);
orderRoute.put(
  "/admin/orders/:orderId/status",
  authenticate,
  authorize(["admin"]),
  updateOrderStatus
);

module.exports = orderRoute;
