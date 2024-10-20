const {
  validateUserAddress,
  validateUpdateUserAddress,
} = require("../Validation/validateAddress");
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
    const { Street, City, ZipCode, Country, isDefault } = req.body;
    let addressDoc = await Address.findOne({ user: req.user.id });
    if (!addressDoc)
      addressDoc = new Address({ user: user._id, addresses: [] });

    const existingAddress = addressDoc.addresses.find(
      (addr) =>
        addr.Street === Street &&
        addr.City === City &&
        addr.ZipCode === ZipCode &&
        addr.Country === Country
    );
    if (existingAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Address already exists." });
    }

    if (isDefault) {
      addressDoc.addresses.forEach((addr) => (addr.isDefault = false));
    }

    addressDoc.addresses.push({
      Street,
      City,
      ZipCode,
      Country,
      isDefault: isDefault || addressDoc.addresses.length === 0,
    });
    await addressDoc.save();
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

const updateAddress = async (req, res) => {
  const { error } = validateUpdateUserAddress(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  try {
    const { addressId } = req.params;
    const userId = req.user.id;

    const addressDoc = await Address.findOne({ user: userId });
    if (!addressDoc)
      return res
        .status(404)
        .json({ success: false, message: "No address found." });

    const addressIndex = addressDoc.addresses.findIndex(
      (addr) => addr._id.toString() === addressId
    );
    if (addressIndex === -1)
      return res
        .status(404)
        .json({ success: false, message: "Address not found." });

    addressDoc.addresses[addressIndex] = {
      ...addressDoc.addresses[addressIndex],
      ...req.body,
    };

    if (req.body.isDefault) {
      addressDoc.addresses.forEach((addr, i) => {
        if (i !== addressIndex) addr.isDefault = false;
      });
    }

    await addressDoc.save();
    res.status(200).json({
      success: true,
      message: "User address updated.",
      address: addressDoc,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const addressDoc = await Address.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );
    if (!addressDoc)
      return res
        .status(404)
        .json({ success: false, message: "No address found." });

    if (
      addressDoc.addresses.length > 0 &&
      !addressDoc.addresses.some((addr) => addr.isDefault)
    ) {
      addressDoc.addresses[0].isDefault = true;
      await addressDoc.save();
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Address deleted.",
        address: addressDoc,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { createAddress, getAddresses, updateAddress, deleteAddress };
