const express = require("express");
const { authenticate, authorize } = require("../Middlewares/authentication");
const {
  createNewProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
} = require("../Controllers/Product.controller");
const { Product } = require("../Models/product.model");
const productRoute = express.Router();

productRoute.get("/", getAllProducts);
productRoute.get("/:id", getProduct);
productRoute.post(
  "/create",
  authenticate,
  authorize(["admin"]),
  createNewProduct
);
productRoute.delete("/delete/:id", deleteProduct);

module.exports = productRoute;
