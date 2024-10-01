const express = require("express");
const { authenticate } = require("../Middlewares/authentication");
const { addToCart, updateCart, deleteFromCart, getCartItems } = require("../Controllers/Cart.controller");
const cartRoute = express.Router();

cartRoute.get("/", authenticate, getCartItems)
cartRoute.post("/add", authenticate, addToCart);
cartRoute.put("/update/:itemId", authenticate, updateCart);
cartRoute.delete("/delete/:itemId", authenticate, deleteFromCart);

module.exports = cartRoute;
