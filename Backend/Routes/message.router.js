const express = require("express");
const {
  sendMessage,
  getSentMessages,
  deleteMessage,
} = require("../Controllers/Message.controller");
const { authenticate, authorize } = require("../Middlewares/authentication");
const messageRoute = express.Router();
messageRoute.get("/", authenticate, authorize(["admin"]), getSentMessages);
messageRoute.post("/send", sendMessage);
messageRoute.delete(
  "/delete/:messageId",
  authenticate,
  authorize(["admin"]),
  deleteMessage
);
module.exports = messageRoute;
