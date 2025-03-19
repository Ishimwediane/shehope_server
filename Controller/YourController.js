import User from "../Model/UserModel.js";
import Blog from "../Model/BlogModel.js";
import Tip from "../Model/TipsModel.js";
import Event from "../Model/Event.js";

export const getBlogsAndTipsByTrimester = async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query parameters

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract user's trimester
    const { trimester } = user;

    // Fetch blogs and tips based on trimester
    const blogs = await Blog.find({ trimester }).sort({ createdAt: -1 });
    const tips = await Tip.find({ trimester }).sort({ createdAt: -1 });

    // Send response
    res.status(200).json({
      trimester,
      blogs,
      tips,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs and tips", error: error.message });
  }
};

export const eventByUserId = async (req, res, next) => {
  try {
    const { userId } = req.query;  // For GET requests, userId comes from query params

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Pass the user information to the next middleware or controller
    req.user = user;  // You can attach the user to the request object
    next();  // Call next to continue to the next middleware or controller
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};



