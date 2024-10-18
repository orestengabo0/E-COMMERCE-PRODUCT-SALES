const Cart = require("../Models/cart.model");
const Order = require("../Models/order.model");
const { Product } = require("../Models/product.model");
const { validateOrder } = require("../Validation/validateOrder");

const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found." });
    res.status(200).json({ success: false, data: cart.items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }
    const existingItem = cart.items.find((item) =>
      item.product.equals(productId)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.price = product.price;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }
    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Product added to cart.", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
const updateCart = async (req, res) => {
  const { quantity } = req.body;
  const { itemId } = req.params;

  if (quantity === undefined || quantity <= 0) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid quantity." });
  }

  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found." });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in the cart." });
    }

    const product = await Product.findById(item.product);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    item.quantity = quantity;
    item.price = product.price;

    await cart.save();

    return res
      .status(200)
      .json({ success: true, message: "Cart updated successfully.", cart });
  } catch (error) {
    console.error("Error updating cart: ", error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, message: "Server error." });
    }
  }
};

const checkout = async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    const userId = req.user.id;
    const { products, shippingAddress } = req.body;
    let totalAmount = 0;
    const updatedProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product)
        return res.status(404).json({
          success: false,
          message: `Product with id: ${item.product} was not found.`,
        });

      if (item.quantity > product.stock)
        return res
          .status(400)
          .json({ success: false, message: "Products not enough in stock." });

      const productPrice = product.price;
      const productTotal = productPrice * item.quantity;
      totalAmount += productTotal;

      updatedProducts.push({
        product: item.product,
        quantity: item.quantity,
        price: productPrice,
      });
      product.stock -= item.quantity;
      await product.save();
    }

    const newOrder = new Order({
      user: userId,
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
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const deleteFromCart = async (req, res) => {
  const { itemId } = req.params;
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found." });

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex == -1)
      return res
        .status(404)
        .json({ success: false, message: "Item not found in the cart" });
    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.status(200).json({ success: true, message: "Item remove from cart." });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
module.exports = {
  getCartItems,
  addToCart,
  updateCart,
  deleteFromCart,
  checkout,
};
