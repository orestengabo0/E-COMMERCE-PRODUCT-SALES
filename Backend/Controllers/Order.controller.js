const { validateOrder } = require("../Validation/validateOrder");
const Order = require("../Models/order.model");
const { Product } = require("../Models/product.model");

const createOrder = async (req, res) => {
    const { error } = validateOrder(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    try {
      const { user, products, shippingAddress } = req.body;
      let totalAmount = 0;
      const updatedProducts = [];
  
      for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product)
          return res
            .status(404)
            .json({
              success: false,
              message: `Product with id: ${item.product} was not found.`,
            });
        const productPrice = product.price
        const productTotal = productPrice * item.quantity
        totalAmount += productTotal
  
        updatedProducts.push({
          product: item.product,
          quantity: item.quantity,
          price: productPrice
        })
      }
  
      const newOrder = new Order({
        user,
        products: updatedProducts,
        totalAmount,
        shippingAddress,
      });
      await newOrder.save();
      res.status(201).json({
        success: true,
        message: "Order sent successfully.",
        order: newOrder,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }
module.exports = { createOrder }