const { validateCategory } = require("../Validation/validateCategory");
const Category = require("../Models/category.model");

const createCategory = async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    const { name } = req.body;
    const newCategory = new Category({
      name: name,
    });
    await newCategory.save();
    res
      .status(201)
      .json({ success: true, message: "Category created successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        if(!categories) return res.status(404).json({ success: false, message: "No category found."})
        res.status(200).json({ success: true, message: "Successfully.", categories})
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error."})
    }
}

const updateCategory = async (req, res)=> {
    const { error } = validateCategory(req.body)
    if(error) return res.status(400).json({ success: false, message: error.details[0].message})
    try {
        const categoryId = req.params.categoryId
        const { name } = req.body
        const category = await Category.findById(categoryId)
        if(!category)
            return res.status(404).json({ success: false, message: "No category found."})
        category.name = name
        await category.save()
        res.status(200).json({ success: true, message: "Category update successfully.", category})
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error."})
    }
}
module.exports = { createCategory, getCategories, updateCategory };
