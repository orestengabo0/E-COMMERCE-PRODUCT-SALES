const express = require("express");
const { authenticate } = require("../Middlewares/authentication");
const { createOrder, getOrders } = require("../Controllers/Order.controller");
const Order = require("../Models/order.model");
const orderRoute = express.Router();

orderRoute.get("/", authenticate, getOrders);
orderRoute.post("/create", authenticate, createOrder);
orderRoute.delete("/:orderId/cancel", authenticate, async (req, res) => {
    try{
        const userId = req.user._id;
        const { orderId } = req.params.orderId
        const order = await Order.findOne({ _id: orderId, user: userId})
        if(!order) return res.status(404).json({success: false, message: "Order not found."})
        if(order.status !== "Pending") return res.status(400).json({success: false, message: "Order cannot be canceled at this stage."})
        order.status = "Cancelled"
        await order.save()
        res.status(200).json({success: true, message: "Order canceled."})
    }catch(error){
        res.status(500).json({success: false, message: "Server error."})
    }
})

module.exports = orderRoute;
