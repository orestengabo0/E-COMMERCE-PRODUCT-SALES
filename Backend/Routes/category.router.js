const express = require("express");
const { authenticate, authorize } = require("../Middlewares/authentication");
const { createCategory } = require("../Controllers/Category.controller");
const Category = require("../Models/category.model");
const categoryRoute = express.Router();
categoryRoute.get("/", async (req, res) => {
    try {
        const categories = await Category.find()
        if(!categories) return res.status(404).json({ success: false, message: "No category found."})
        res.status(200).json({ success: true, message: "Successfully.", categories})
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error."})
    }
})
categoryRoute.post(
  "/create",
  authenticate,
  authorize(["admin"]),
  createCategory
);
module.exports = categoryRoute;
