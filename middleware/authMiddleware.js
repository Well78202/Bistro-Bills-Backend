const jwt = require("jsonwebtoken");
const User = require("../models/User");

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

const protect = async (req, res, next) => {
  let token;

  // Check for Authorization header with Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // Fallback to token in cookies
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // If no token is found, return an error
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the token payload (i.e., user ID)
    req.user = await User.findById(decoded.id).select("-password");

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return an error
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protect, adminMiddleware };
