const express = require("express");
const { authenticate, authorize } = require("../Middlewares/authentication");
const {
  createCategory,
  getCategories,
  updateCategory,
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
module.exports = categoryRoute;
