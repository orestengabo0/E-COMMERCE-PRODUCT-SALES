const Brand = require("../Models/brand.model");
const { find } = require("../Models/category.model");
const { validateBrand } = require("../Validation/validateBrand");

const createBrand = async (req, res) => {
  const { error } = validateBrand(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    const { name, brandImage } = req.body;
    const lowerCaseName = name.toLowerCase();
    const existingBrand = await Brand.findOne({ name: lowerCaseName });
    if (existingBrand)
      return res
        .status(400)
        .json({ success: false, message: "Brand already exists." });
    const newBrand = new Brand({
      name: lowerCaseName,
      brandImage: brandImage,
    });
    await newBrand.save();
    res
      .status(201)
      .json({ success: true, message: "Brand created successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    if (!brands)
      return res
        .status(404)
        .json({ success: false, message: "No brand found." });
    res.status(200).json({ success: true, message: "Successfully.", brands });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const updateBrand = async (req, res) => {
  const { error } = validateBrand(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    const brandId = req.params.brandId;
    const { name, brandImage } = req.body;
    const brand = await Brand.findById(brandId);
    if (!brand)
      return res
        .status(404)
        .json({ success: false, message: "No brand found." });
    brand.name = name;
    brand.brandImage = brandImage;
    await brand.save();
    res
      .status(200)
      .json({ success: true, message: "Brand update successfully.", brand });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
const deleteBrand = async (req, res) => {
  try {
    const brandId = req.params.brandId;
    const brand = await Brand.findByIdAndDelete(brandId);
    if (!brand)
      return res
        .status(404)
        .json({ success: false, message: "Brand not found." });
    res
      .status(200)
      .json({ success: true, message: "Brand deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
module.exports = { createBrand, getBrands, updateBrand, deleteBrand };