const Cart = require('../Models/cart.model')
const { Product } = require('../Models/product.model')

const addToCart = async(req, res) => {
    const { productId, quantity = 1 } = req.body
    try {
        const product = await Product.findById(productId)
        if(!product) return res.status(400).json({ success: false, message: "No product found." })

        let cart = await Cart.findOne({ user: req.user.id})
        if(!cart) {
            cart = new Cart({ user: req.user.id, items: []})
        }
        const existingItem = cart.items.find(item => item.product.equals(productId))
        if(existingItem) {
            existingItem.quantity += quantity
            existingItem.price = product.price
        } else{
            cart.items.push({ product: productId, quantity, price: product.price})
        }
        await cart.save()
        res.status(201).json({success: true, message: "Item added to cart.", cart})
    } catch (error) {
        console.error("Error adding to cart ", error)
        res.status(500).json({success: false, message: "Server error."})
    }
}
module.exports = { addToCart }