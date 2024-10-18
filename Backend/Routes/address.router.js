const express = require("express");
const { authenticate } = require("../Middlewares/authentication");
const { User } = require("../Models/user.model");
const Address = require("../Models/address.model");
const {
  createAddress,
  getAddresses,
  updateAddress,
} = require("../Controllers/Address.controller");
const addressRoute = express.Router();

addressRoute.post("/create", authenticate, createAddress);
addressRoute.get("/", authenticate, getAddresses);
addressRoute.put("/update", authenticate, updateAddress);
addressRoute.delete("/delete/:addressId", authenticate, async (req, res) => {
  try {
    const { addressId } = req.params;
    const address = await Address.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );
    if (!address)
      return res
        .status(404)
        .json({ success: false, message: "No address found." });
    res.status(200).json({ success: true, message: "User deleted.", address });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = addressRoute;
