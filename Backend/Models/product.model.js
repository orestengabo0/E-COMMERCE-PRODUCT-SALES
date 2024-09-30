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
        type: String,
        required: true,
        trim: true
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
    ratings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: Number,
                min: 1,
                max: 5
            },
            comment: {
                type: String,
                trim: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports.Product = Product