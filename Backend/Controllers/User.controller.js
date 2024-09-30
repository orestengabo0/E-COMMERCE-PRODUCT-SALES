const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../Models/user.model")
const {
  validateLogin,
  validateRegistration,
} = require("../Validation/validation");

const createUser = async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error)
      return res
          .status(400)
          .json({ success: false, message: error.details[0].message });

  try {
      const { username, email, password, role } = req.body;

      let userRole = (req.user && req.user.role === "admin") ? "admin" : "user";

      if (role === "admin") {
          const adminUser = await User.findOne({ role: "admin", email });
          if (adminUser) {
              return res.status(400).json({ success: false, message: "Admin User exists." });
          }
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser)
          return res
              .status(401)
              .json({ success: false, message: "Email or Username exists." });

      const newUser = new User({ username, email, password: hashedPassword, role: userRole });
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
      return res.status(401).json({ success: false, message: "Invalid credentials." });
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
module.exports = { createUser, loginUser };
