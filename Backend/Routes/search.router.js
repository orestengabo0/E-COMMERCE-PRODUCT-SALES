const express = require("express");
const { Product } = require("../Models/product.model");
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
        result = await Product.find({
          $or: [{ name: { $regex: query, $options: "i" } }],
        });
        break;
      case "user":
        if (req.user.role !== "admin")
          return res
            .status(400)
            .json({ success: false, message: "Access denied." });
        result = await Product
    }
  } catch (error) {}
});
