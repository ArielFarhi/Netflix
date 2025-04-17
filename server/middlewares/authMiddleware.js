import jwt from "jsonwebtoken";
import User from "../models/User.js";

async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await User.findById(decodedToken.userId).select("-password");
    if (!foundUser) {
      return res.status(401).json({ message: "User not found." });
    }
    req.user = foundUser;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
}

export default requireAuth;