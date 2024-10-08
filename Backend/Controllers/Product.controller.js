const {
  validateCreateProduct,
  validateUpdateProduct,
  validateRatingProduct,
} = require("../Validation/validateProduct");
const { Product } = require("../Models/product.model");
const Category = require("../Models/category.model");

const createNewProduct = async (req, res) => {
  const { error } = validateCreateProduct(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    const { name, description, price, categoryId, brand, stock, images } =
      req.body;
    const category = await Category.findById(categoryId)
    if(!categoryId) return res.status(404).json({ success: false, message: "Category not found."})
    const newProduct = new Product({
      name,
      description,
      price,
      category: categoryId,
      brand,
      stock,
      images,
      ratings: {
        average: 0,
        count: 0,
        users: [],
      },
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

const rateProduct = async (req, res) => {
  const { error } = validateRatingProduct(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    const userId = req.user.id;
    if (!userId)
      return res
        .status(404)
        .json({ success: false, message: "No user found." });

    const { productId, rating } = req.body;
    if (rating < 1 || rating > 5)
      return res
        .status(400)
        .json({ success: false, message: "Ratings must be 1 to 5." });
    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });

    if (Array.isArray(product.ratings.users)) product.ratings.users = [];

    const existingRating = product.ratings.users.find(
      (r) => r.user.toString() === userId
    );
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      product.ratings.users.push({
        user: userId,
        product: productId,
        rating,
      });
      product.ratings.count += 1;
    }
    const totalRatings = product.ratings.users.length
      ? product.ratings.users.reduce((sum, r) => sum + r.rating, 0)
      : 0;

    product.ratings.average = totalRatings / product.ratings.count;
    await product.save();
    res.status(200).json({
      success: true,
      message: "Product rated successfully.",
      product: product.name,
      rating: product.ratings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category','name');
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
  rateProduct,
};
