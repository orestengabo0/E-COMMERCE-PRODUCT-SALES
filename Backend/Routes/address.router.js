const express = require("express");
const { authenticate } = require("../Middlewares/authentication");
const {
  validateUserAddress,
  validateUpdateUserAddress,
} = require("../Validation/validateAddress");
const { User } = require("../Models/user.model");
const Address = require("../Models/address.model");
const {
  createAddress,
  getAddresses,
} = require("../Controllers/Address.controller");
const addressRoute = express.Router();

addressRoute.post("/create", authenticate, createAddress);
addressRoute.get("/", authenticate, getAddresses);


module.exports = addressRoute;
