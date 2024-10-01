const { validateOrder } = require("../Validation/validateOrder");
const Order = require("../Models/order.model");
const { Product } = require("../Models/product.model");

const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate(
      "products.product",
      "name price"
    );
    if (!orders)
      return res
        .status(404)
        .json({ success: false, message: "No order found." });
    res
      .status(200)
      .json({ success: true, data: orders, message: "Orders found." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const createOrder = async (req, res) => {
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
      const productPrice = product.price;
      const productTotal = productPrice * item.quantity;
      totalAmount += productTotal;

      updatedProducts.push({
        product: item.product,
        quantity: item.quantity,
        price: productPrice,
      });
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
    res.status(500).json({ success: false, message: "Server error." });
  }
};
const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });

    if (order.status !== "Pending")
      return res.status(400).json({
        success: false,
        message: "Order cannot be canceled at this stage.",
      });
    order.status = "Cancelled";
    await order.save();
    res.status(200).json({ success: true, message: "Order canceled." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
module.exports = { createOrder, getOrders, cancelOrder };
