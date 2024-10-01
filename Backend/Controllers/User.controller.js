const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../Models/user.model");
const { hashPassword } = require("../Security/hashPasswords");
const {
  validateLogin,
  validateRegistration,
} = require("../Validation/validationUser");

const createUser = async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  try {
    const { username, email, password, role } = req.body;

    if (role === "admin") {
      const adminUser = await User.findOne({ role: "admin", email });
      if (adminUser) {
        return res
          .status(400)
          .json({ success: false, message: "Admin User exists." });
      }
    }

    const hashedPassword = await hashPassword(password);

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "Email or Username exists." });

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (ex) {
    console.error(ex);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ success: true, token: token, message: "User logged in" });
  } catch (ex) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const updatePermission = async (req, res) => {
  const { email } = req.params;

  if (req.user.role !== "admin") {
    res
      .status(401)
      .json({ success: false, message: "Access denied. User not admin." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    if (user.email == "orestengabo0@gmail.com")
      return res
        .status(400)
        .json({ success: false, message: "Root admin cannot change role." });
    if (user.role == "admin")
      return res
        .status(400)
        .json({ success: false, message: "User is already admin" });
    user.role = "admin";
    await user.save();
    res
      .status(200)
      .json({ success: true, message: `${email} was promoted to admin.` });
  } catch (ex) {
    res.status(500).json({ success: false, message: "Server error!" });
  }
};
const revokeAdminPermission = async (req, res) => {
  const { email } = req.params;
  if (req.user.role !== "admin")
    return res
      .status(401)
      .json({ success: false, message: "Access denied. User not admin." });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    if (user.email == "orestengabo0@gmail.com")
      return res.status(400).json({
        success: false,
        message: "Root admin cannot be a normal user.",
      });

    if (user.role == "user") {
      return res
        .status(400)
        .json({ success: false, message: "User is already a regular user." });
    }
    user.role = "user";
    await user.save();
    res
      .status(200)
      .json({ success: true, message: `${email} revoked admin permissions.` });
  } catch (ex) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    const user = await User.findById(currentUser.id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    res.status(200).json({ success: true, user });
  } catch (ex) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "No user found." });
    res.status(200).json({success: true, data: user})
  } catch (error) {
    console.error("Error getting users ", error)
    res.status(500).json({success: false, message: "Server error."})
  }
}

module.exports = {
  createUser,
  loginUser,
  updatePermission,
  revokeAdminPermission,
  getCurrentUser,
  getUserById
};
