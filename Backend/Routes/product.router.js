const express = require("express");
const { authenticate, authorize } = require("../Middlewares/authentication");
const {
  createNewProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
} = require("../Controllers/Product.controller");
const { Product } = require("../Models/product.model");
const { validateUpdateProduct } = require("../Validation/validateProduct");
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
productRoute.put("/update/:id", async (req, res) => {
  const { error } = validateUpdateProduct(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    res
      .status(200)
      .json({
        success: false,
        data: updatedProduct,
        message: "Product updated successfully.",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = productRoute;
