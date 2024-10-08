const express = require("express");
const { authenticate } = require("../Middlewares/authentication");
const {
  addToCart,
  updateCart,
  deleteFromCart,
  getCartItems,
  checkout,
} = require("../Controllers/Cart.controller");
const Cart = require("../Models/cart.model");
const cartRoute = express.Router();

cartRoute.get("/", authenticate, getCartItems);
cartRoute.post("/add", authenticate, addToCart);
cartRoute.post("/checkout", authenticate, checkout);
cartRoute.put("/update/:itemId", authenticate, updateCart);
cartRoute.delete("/delete/:itemId", authenticate, deleteFromCart);

module.exports = cartRoute;
