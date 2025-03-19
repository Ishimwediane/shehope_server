import User from '../Model/UserModel.js'
import { Types } from 'mongoose';
import bcrypt from "bcryptjs"
import { generateAccessToken } from '../Utils/tokenGeneratin.js';

//register user

export const registerUser = async (req, res) => {
    try {
      const { name,last_name, email, password, date_of_birth, trimester} = req.body;
  
      // Check if required fields are provided
      if (!name || !email || !password || !date_of_birth ||!trimester || !last_name) {
        return res.status(400).json({ message: "Name, last_name,email,password,trimester and date_of_birth are required" });
      }
  
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);  // Salt rounds = 10
  
      // Create the new user with validated and hashed data
      const user = new User({
       name,
       last_name,
       email,
       password: hashedPassword,
       date_of_birth,
       trimester,
      });
  
      // Generate access token for the user
      user.tokens.accessToken = generateAccessToken(user);
      await user.save();
  
      // Send response with created user and access token
      res.status(201).json({
        message: "Account created successfully!",
        user: {
          ...user.toObject(),
          tokens: {
            accessToken: user.tokens.accessToken,
          },
        },
      });
    } catch (error) {
      console.error("Error during registration:", error);  // Log for debugging
      res.status(500).json({ message: "Failed to register user", error: error.message });
    }
  };

  // Login a user
export const Login = async (req, res) => {
    try {
      const { email, password } = req.body;  // Change userPassword to password here
      console.log("Request body:", req.body);
  
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
      
      console.log("Found user:", user);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Compare the password with the stored hashed password
      console.log('Comparing password:', password, user.password);
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match result:', isMatch);
  
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Generate access token
      const accessToken = generateAccessToken(user);
  
      // Send response with user details and token
      const userResponse = {
        _id: user._id,
        name:user.name,
        email: user.email,
        tokens: { accessToken },
      };
      

      res.json({ user: userResponse });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
 // Example in user controller
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      name: user.name,
      email: user.email,
      trimester: user.trimester,  // Make sure to send trimester in the response
      location: user.location,
      // Other user details...
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error: error.message });
  }
};


// In the user controller (for example, UserController.js)
// In your user controller
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

