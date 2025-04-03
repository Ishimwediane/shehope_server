import User from "../Model/UserModel.js";
import Post from '../Model/Post.js';
import Report from '../Model/Report.js';
import Blog from "../Model/BlogModel.js";
import Tip from "../Model/TipsModel.js";
import Donation from '../Model/Donation.js';
import Calendar from "../Model/AdminCalendar.js";

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
          select: 'name'       // Only select the username field from the user
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
    // Find the post by postId
    const post = await Post.findById(postId).populate('reports');
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Find the specific report by its ID within the post's reports array
    const report = post.reports.find(r => r._id.toString() === reportId);
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




// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// Get all tips
export const getAllTips = async (req, res) => {
  try {
    const tips = await Tip.find();
    res.status(200).json(tips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tips", error });
  }
};
//create blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, image, trimester, link } = req.body;
    const newBlog = new Blog({ title, content, image, trimester, link });
    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Error creating blog", error: error.message });
  }
};

//delet blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
};

//  Update a Blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Error updating blog", error: error.message });
  }
};

export const createTip = async (req, res) => {
  try {
    const { message, trimester, icon } = req.body;
    const newTip = new Tip({ message, trimester, icon });
    await newTip.save();
    res.status(201).json({ message: "Tip created successfully", tip: newTip });
  } catch (error) {
    console.error("Error creating tip:", error);
    res.status(500).json({ message: "Error creating tip", error: error.message });
  }
};

//  Update a Tip
export const updateTip = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTip = await Tip.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTip) return res.status(404).json({ message: "Tip not found" });

    res.status(200).json({ message: "Tip updated successfully", tip: updatedTip });
  } catch (error) {
    console.error("Error updating tip:", error);
    res.status(500).json({ message: "Error updating tip", error: error.message });
  }
};

//  Delete a Tip
export const deleteTip = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTip = await Tip.findByIdAndDelete(id);
    if (!deletedTip) return res.status(404).json({ message: "Tip not found" });

    res.status(200).json({ message: "Tip deleted successfully" });
  } catch (error) {
    console.error("Error deleting tip:", error);
    res.status(500).json({ message: "Error deleting tip", error: error.message });
  }
};


//donationrequest
export const getAllDonations = async (req, res) => {
  try {
    // Fetch all donations and populate the user data (name and email)
    const donations = await Donation.find().populate('user', 'name email');
    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Could not fetch donations.' });
  }
};

// Controller to update a donation (e.g., approve, reject)
export const updateDonation = async (req, res) => {
  const { donationId } = req.params;
  const { status } = req.body;  // Status might be something like "approved", "rejected"
  
  try {
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    // Update donation status (this could be any other field you need to manage)
    donation.status = status;
    await donation.save();
    
    res.json({ message: 'Donation updated successfully', donation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Could not update donation.' });
  }
};


//events
export const getEvents = async (req, res) => {
  try {
    const events = await Calendar.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, start, end } = req.body;
    const newEvent = new Calendar({ title, start, end });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Update event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params; // Get event ID from URL params
    const { title, start, end } = req.body; // Get updated event data from request body

    const updatedEvent = await Calendar.findByIdAndUpdate(
      id,
      { title, start, end },
      { new: true } // Return the updated event
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(updatedEvent); // Send back the updated event
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params; // Get event ID from URL params

    const deletedEvent = await Calendar.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};