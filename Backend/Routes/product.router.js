const express = require("express");
const validateCreateProduct = require("../Validation/validateProduct");
const { Product } = require("../Models/product.model");
const { authenticate, authorize } = require("../Middlewares/authentication");
const productRoute = express.Router();

productRoute.post("/create", authenticate, authorize(['admin']), async (req, res) => {
  const { error } = validateCreateProduct(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    const { name, description, price, category, stock, images, ratings } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
      ratings
    });
    await newProduct.save()
    res.status(201).json({success: true, message: "Product created successfully."})
  } catch (error) {
    console.error("Error creating user ", error)
    res.status(500).json({success:false, message: "Server error."})
  }
});

module.exports = productRoute