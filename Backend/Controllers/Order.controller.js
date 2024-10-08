const { validateOrder } = require("../Validation/validateOrder");
const Order = require("../Models/order.model");
const { Product } = require("../Models/product.model");

const getAllOrdersAsAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username")
      .populate("products.product", "name price");
    if (!orders)
      return res
        .status(400)
        .json({ success: false, message: "No orders found." });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
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
const getOrderById = async (req, res) => {
  try {
    const products = await Order.findById(req.params.orderId);
    if (!products)
      return res
        .status(404)
        .json({ success: false, message: "No order found." });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const getOrderStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order)
      return res
        .status(400)
        .json({ success: false, message: "No order found." });
    res.status(200).json({ success: true, status: order.status });
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

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
  ];
  try {
    if (!validStatuses.includes(status))
      return res
        .status(400)
        .json({ success: false, message: "Invalid status." });
    const order = await Order.findById(req.params.orderId);
    if (!order)
      return res
        .status(400)
        .json({ success: false, message: "Order not found." });
    order.status = status;
    await order.save();
    res
      .status(200)
      .json({ success: true, message: "Order status updated.", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};
module.exports = {
  getOrders,
  getOrderById,
  cancelOrder,
  getOrderStatus,
  getAllOrdersAsAdmin,
  updateOrderStatus,
};
