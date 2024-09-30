const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers['Authorization']?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token." });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Access denied. You are not allowed to access this service.",
      });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
