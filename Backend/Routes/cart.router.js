const express = require("express");
const { authenticate } = require("../Middlewares/authentication");
const { addToCart, updateCart } = require("../Controllers/Cart.controller");
const cartRoute = express.Router();

cartRoute.post("/add", authenticate, addToCart);
cartRoute.put("/update/:itemId", authenticate, updateCart);

module.exports = cartRoute;
