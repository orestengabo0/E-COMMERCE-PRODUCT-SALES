const express = require("express");
const { authenticate } = require("../Middlewares/authentication");
const { createOrder, getOrders, cancelOrder } = require("../Controllers/Order.controller");
const Order = require("../Models/order.model");
const orderRoute = express.Router();

orderRoute.get("/user/myOrders", authenticate, getOrders);
orderRoute.get("/user/myOrders/:orderId/status", authenticate, async(req, res) => {
    try {
        const userId = req.user.id
        const { orderId } = req.params
        const order = await Order.findOne({ _id: orderId, user: userId})
        if(!order) return res.status(400).json({success: false, message: "No order found."})
        res.status(200).json({success: true, status: order.status })
    } catch (error) {
        res.status(500).json({success: false, message: "Server error."})
    }
})
orderRoute.post("/create", authenticate, createOrder);
orderRoute.delete("/:orderId/cancel", authenticate, cancelOrder);

module.exports = orderRoute;
