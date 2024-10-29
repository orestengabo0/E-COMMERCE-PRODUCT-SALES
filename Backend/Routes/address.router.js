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
addressRoute.put("/update/:addressId", authenticate, updateAddress);
addressRoute.put(
  "/update/set-default/:addressId",
  authenticate,
  async (req, res) => {
    const userId = req.user.id;
    const { addressId } = req.params;

    try {
      // First, find the current default address and clear its default status
      const currentDefault = await Address.findOne({
        user: userId,
        "addresses.isDefault": true,
      });

      if (currentDefault) {
        await Address.updateOne(
          { _id: currentDefault._id, "addresses.isDefault": true },
          { $set: { "addresses.$.isDefault": false } }
        );
      }

      // Then, set the new default address
      const result = await Address.updateOne(
        { user: userId, "addresses._id": addressId },
        { $set: { "addresses.$.isDefault": true } }
      );

      if (result.modifiedCount > 0) {
        return res
          .status(200)
          .json({ success: true, message: "Address set as default." });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Address not found." });
      }
    } catch (error) {
      console.error("Failed to clear default address:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to clear default address." });
    }
  }
);


addressRoute.delete("/delete/:addressId", authenticate, deleteAddress);

module.exports = addressRoute;
