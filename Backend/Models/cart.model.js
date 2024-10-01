const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema({
    user:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref:"User",
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ]
}, { timestamps: true })

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart