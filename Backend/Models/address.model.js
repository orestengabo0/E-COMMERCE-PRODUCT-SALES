const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Street: {
      type: String,
      required: true,
      trim: true,
    },
    City: {
      type: String,
      required: true,
      trim: true,
    },
    ZipCode: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
