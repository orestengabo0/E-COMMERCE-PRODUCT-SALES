const express = require("express");
const { authenticate } = require("../Middlewares/authentication");
const { User } = require("../Models/user.model");
const Address = require("../Models/address.model");
const {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} = require("../Controllers/Address.controller");
const addressRoute = express.Router();

addressRoute.post("/create", authenticate, createAddress);
addressRoute.get("/", authenticate, getAddresses);
addressRoute.put("/update", authenticate, updateAddress);
addressRoute.delete("/delete/:addressId", authenticate, deleteAddress);

module.exports = addressRoute;
