const express = require('express')
const { validateCategory } = require('../Validation/validateCategory')
const Category = require('../Models/category.model')
const categoryRoute = express.Router()
categoryRoute.post("/create", async(req, res) => {
    const { error } = validateCategory(req.body)
    if(error) return res.status(400).json({ success: false,message: error.details[0].message})
    try {
        const { name } = req.body
        const newCategory = new Category({
            name: name
        })
        await newCategory.save()
        res.status(201).json({ success: true, message: "Category created successfully."})
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error."})
    }
})
module.exports = categoryRoute 