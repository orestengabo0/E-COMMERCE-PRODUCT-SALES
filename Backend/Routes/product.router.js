const express = require("express");
const { authenticate, authorize } = require("../Middlewares/authentication");
const {
  createNewProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../Controllers/Product.controller");
const productRoute = express.Router();

productRoute.get("/", getAllProducts);
productRoute.get("/:id", getProduct);
productRoute.post(
  "/create",
  authenticate,
  authorize(["admin"]),
  createNewProduct
);
productRoute.delete(
  "/delete/:id",
  authenticate,
  authorize(["admin"]),
  deleteProduct
);
productRoute.put("/update/:id", updateProduct);

module.exports = productRoute;
