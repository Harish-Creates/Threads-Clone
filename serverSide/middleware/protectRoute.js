const {User} = require("../models/userModel");
const jwt = require("jsonwebtoken");
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: "UnAuthorized" });
    const decoded = jwt.verify(token, process.env.SecretKey);
    const user = await User.findById(decoded.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect Route", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  protectRoute,
};
