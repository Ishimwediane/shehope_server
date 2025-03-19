import express from "express";
import Blog from "../Model/BlogModel.js";
import Tip from "../Model/TipsModel.js";
import User from "../Model/UserModel.js";

import jwt from 'jsonwebtoken';
import Event from "../Model/Event.js";
// Route to get blogs and tips based on trimester
export const getBlogsAndTipsByTrimester = async (req, res) => {
    try {
      const { userId } = req.query; // or req.params if using URL params
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const trimester = user.trimester;
  
      // Fetch blogs and tips for that trimester
      const blogs = await Blog.find({ trimester });
      const tips = await Tip.find({ trimester });
  
      res.status(200).json({ trimester, blogs, tips });
    } catch (error) {
      res.status(500).json({ message: "Error fetching blogs and tips", error: error.message });
    }
  };
 


 
