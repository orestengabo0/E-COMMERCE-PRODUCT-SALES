const mongoose = require('mongoose')
const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
})
const Category = mongoose.model("Category", categoryModel)
module.exports = Category