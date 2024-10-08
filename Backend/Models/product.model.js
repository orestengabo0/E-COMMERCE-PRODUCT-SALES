const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    brand: {
        type: String,
        trim: true
    },
    images: [
        {
            url: {
                type: String,
                required: true
            },
            altText: {
                type: String,
                required: true
            }
        }
    ],
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
        users: [
            { 
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
                rating: { type: Number, required: true, min: 0, max: 5 }
            }
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports.Product = Product