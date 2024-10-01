const express = require("express");
const { authenticate } = require("../Middlewares/authentication");
const { createOrder } = require("../Controllers/Order.controller");
const orderRoute = express.Router();

orderRoute.post("/create", authenticate, createOrder);

module.exports = orderRoute;
