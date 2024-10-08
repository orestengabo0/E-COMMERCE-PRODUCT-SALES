const express = require("express");
const { authenticate, authorize } = require("../Middlewares/authentication");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../Controllers/Category.controller");
const Category = require("../Models/category.model");
const { validateCategory } = require("../Validation/validateCategory");
const categoryRoute = express.Router();
categoryRoute.get("/", authenticate, getCategories);
categoryRoute.post(
  "/create",
  authenticate,
  authorize(["admin"]),
  createCategory
);
categoryRoute.put(
  "/update/:categoryId",
  authenticate,
  authorize(["admin"]),
  updateCategory
);
categoryRoute.delete(
  "/delete/:categoryId",
  authenticate,
  authorize(["admin"]),
  deleteCategory
);
module.exports = categoryRoute;
