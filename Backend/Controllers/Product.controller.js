const {
  validateCreateProduct,
  validateUpdateProduct,
} = require("../Validation/validateProduct");
const { Product } = require("../Models/product.model");

const createNewProduct = async (req, res) => {
  const { error } = validateCreateProduct(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    const { name, description, price, category, brand, stock, images, ratings } =
      req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      brand,
      stock,
      images,
      ratings,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "Product created successfully." });
  } catch (error) {
    console.error("Error creating user ", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products)
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ succes: false, message: "Product not found." });
    res.status(200).json({ succes: true, data: product });
  } catch (error) {
    res.status(500).json({ succes: false, message: "Server error." });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    res
      .status(200)
      .json({ success: true, message: "Product delete successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const updateProduct = async (req, res) => {
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
    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
module.exports = {
  createNewProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
