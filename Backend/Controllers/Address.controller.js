const { validateUserAddress } = require("../Validation/validateAddress");
const { User } = require("../Models/user.model");
const Address = require("../Models/address.model");

const createAddress = async (req, res) => {
  const { error } = validateUserAddress(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    const { Street, City, ZipCode, Country } = req.body;
    const newAddress = new Address({
      user: user._id,
      Street,
      City,
      ZipCode,
      Country,
    });
    await newAddress.save();
    res.status(201).json({ success: true, message: "Address saved." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const getAddresses = async (req, res) => {
  try {
    const address = await Address.findOne({ user: req.user.id });
    if (!address)
      return res
        .status(400)
        .json({ success: false, message: "No address found." });
    res.status(200).json({ success: true, address });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { createAddress, getAddresses };
