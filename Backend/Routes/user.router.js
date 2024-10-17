const express = require("express");
const {
  createUser,
  loginUser,
  updatePermission,
  revokeAdminPermission,
  getCurrentUser,
  getUserById,
  getAllUsers,
  updateUserProfile,
} = require("../Controllers/User.controller");
const { authenticate, authorize } = require("../Middlewares/authentication");
const userRoute = express.Router();

userRoute.get("/users", authenticate, authorize(["admin"]), getAllUsers);
userRoute.get("/users/:id", authenticate, authorize(["admin"]), getUserById);
userRoute.get("/user/me", authenticate, getCurrentUser);
userRoute.post("/register", createUser);
userRoute.post("/login", loginUser);
userRoute.put("/update/me", authenticate, updateUserProfile);
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
