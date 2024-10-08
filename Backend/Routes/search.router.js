const express = require("express");
const { Product } = require("../Models/product.model");
const Category = require("../Models/category.model");
const { User } = require("../Models/user.model");
const searchRoute = express.Router();

searchRoute.get("/search", async (req, res) => {
  const { query, type } = req.query;
  if (!query || !type)
    return res
      .status(400)
      .json({ success: false, message: "Query and type are required." });
  try {
    let result;
    switch (type.toLowerCase()) {
      case "product":
        result = await Product.find({
          $or: [
            { name: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
          ],
        });
        break;
      case "category":
        result = await Category.find({
          $or: [{ name: { $regex: query, $options: "i" } }],
        });
        break;
      case "user":
        if (req.user.role !== "admin")
          return res
            .status(400)
            .json({ success: false, message: "Access denied." });
        result = await User.find({
          $or: [
            { username: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
          ],
        });
        break;
      default:
        res
          .status(400)
          .json({ success: false, message: "Invalid type specified." });
    }
    if (result.length == 0)
      return res
        .status(404)
        .json({ success: false, message: `No ${type}s found.` });
    res.status(200).json({ success: true, result})
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error."})
  }
});
