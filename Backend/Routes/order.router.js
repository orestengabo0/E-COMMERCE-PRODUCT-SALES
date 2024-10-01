const express = require("express");
const { authenticate } = require("../Middlewares/authentication");
const { createOrder, getOrders, cancelOrder } = require("../Controllers/Order.controller");
const orderRoute = express.Router();

orderRoute.get("/user/myOrders", authenticate, getOrders);
orderRoute.post("/create", authenticate, createOrder);
orderRoute.delete("/:orderId/cancel", authenticate, cancelOrder);

module.exports = orderRoute;
