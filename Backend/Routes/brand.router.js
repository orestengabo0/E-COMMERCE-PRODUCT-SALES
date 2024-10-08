const express = require("express");
const { authenticate, authorize } = require("../Middlewares/authentication");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrands,
} = require("../Controllers/Brand.controller");
const brandRoute = express.Router();
brandRoute.get("/", authenticate, getBrands);
brandRoute.post("/create", authenticate, authorize(["admin"]), createBrand);
brandRoute.put(
  "/update/:categoryId",
  authenticate,
  authorize(["admin"]),
  updateBrand
);
brandRoute.delete(
  "/delete/:categoryId",
  authenticate,
  authorize(["admin"]),
  deleteBrand
);
module.exports = brandRoute;
