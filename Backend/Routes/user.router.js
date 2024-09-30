const express = require("express");
const {
  createUser,
  loginUser,
  updatePermission,
  revokeAdminPermission,
  getCurrentUser,
} = require("../Controllers/User.controller");
const { authenticate, authorize } = require("../Middlewares/authentication");
const userRoute = express.Router();

userRoute.get("/users/me", authenticate, getCurrentUser);
userRoute.post("/register", createUser);
userRoute.post("/login", loginUser);
userRoute.put(
  "/grant/:email",
  authenticate,
  authorize(["admin"]),
  updatePermission
);
userRoute.put(
  "/revoke/:email",
  authenticate,
  authorize(["admin"]),
  revokeAdminPermission
);

module.exports = userRoute;
