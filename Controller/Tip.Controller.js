import Tip from "../Model/TipsModel.js";
import User from "../Model/UserModel.js";

// Create a new tip
export const createTip = async (req, res) => {
  try {
    const { message, trimester } = req.body;
    if (!message || !trimester) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTip = await Tip.create({ message, trimester });
    res.status(201).json(newTip);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
};

// Get all tips (optional: filter by trimester)
// Get all tips for a specific user
export const getTips = async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query params
    
    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    // Fetch user details to get their trimester
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { trimester } = user; // Get trimester from the user document

    // Fetch tips for that specific trimester
    const tips = await Tip.find({ trimester }).sort({ createdAt: -1 });
    res.status(200).json(tips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tips", error });
  }
};


