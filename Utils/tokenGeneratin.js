import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Generate Access Token
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "4h" } // Access token expires in 4 hours
  );
};

// Generate Refresh Token

