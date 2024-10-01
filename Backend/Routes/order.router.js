const express = require("express");
const { authenticate } = require("../Middlewares/authentication");
const { createOrder, getOrders } = require("../Controllers/Order.controller");
const orderRoute = express.Router();

orderRoute.post("/create", authenticate, createOrder);
orderRoute.get("/", authenticate, getOrders);

module.exports = orderRoute;
