import jwt from 'jsonwebtoken';  // Add this line if it's missing
import dotenv from 'dotenv';

dotenv.config();
// authMiddleware.js
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token provided.");
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Invalid token:", err);
      return res.status(403).json({ message: "Invalid token." });
    }

    req.user = user; // Store user data in request
    console.log("User verified:", user);
    next();
  });
};



