import User from "../Model/UserModel.js";
import Post from '../Model/Post.js';
import Report from '../Model/Report.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// Update a user's details
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// Get all posts with their reports (new function)
export const getAllPostsForAdmin = async (req, res) => {
  try {
    // Fetch all posts and populate their reports and user inside each report
    const posts = await Post.find()
      .populate('comments.user')  // Populating user in comments
      .populate({
        path: 'reports',           // Populating reports in posts
        populate: { 
          path: 'user',            // Populating the user who made the report
          select: 'username'       // Only select the username field from the user
        }
      });

    // Log the posts to check if reports are populated
    console.log(posts); 

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
};



// Resolve a report (new function)
export const resolveReport = async (req, res) => {
  const { postId, reportId } = req.params;

  try {
    // Find the post and the specific report
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const report = post.reports.id(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Mark the report as resolved
    report.resolved = true;
    await post.save();

    res.status(200).json({ message: "Report resolved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error resolving report", error: error.message });
  }
};


// Delete a post (new function)
export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    // Find the post by ID and delete it
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error: error.message });
  }
};

// Delete a comment from a post
export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Remove the comment using the pull method
    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Remove the comment
    post.comments.splice(commentIndex, 1);

    // Save the post with the updated comments
    await post.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error: error.message });
  }
};
