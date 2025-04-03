import Post from '../Model/Post.js';  // Make sure this path is correct
import { authenticateToken } from '../Middlewares/authMiddleware.js';
import express from 'express';
import Report from '../Model/Report.js';
const router = express.Router();

// Route to create a new post (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  const { content } = req.body;

  // Get the user data from the JWT token (name, and optionally email if added to token)
  const { name, isAdmin } = req.user; // Make sure you're using `name` or the relevant field

  try {
    // Create a new post
    const newPost = new Post({
      author: name,  // Using name instead of email
      profileName: name, // You can use 'name' here as well
      content,
    });

    // Save the post to the database
    await newPost.save();

    // Return the newly created post
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post", error });
  }
});



  // Route to get all posts
router.get('/', async (req, res) => {
    try {
      const posts = await Post.find()
        .populate({
          path: 'reports', // Populate the reports field
          populate: { path: 'user', select: 'name' } // Optionally populate the user who reported
        })
        .sort({ createdAt: -1 }); // Get all posts, sorted by newest first

      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Error fetching posts", error });
    }
});


  // Route to like a post
router.post('/like/:postId', authenticateToken, async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.name; // Assuming `name` is the unique identifier for users
  
    try {
      // Find the post by its ID
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }
  
      // Check if the user has already liked the post
      if (post.likes.includes(userId)) {
        return res.status(400).json({ message: 'You have already liked this post.' });
      }
  
      // Add the user's ID to the likes array
      post.likes.push(userId);
      await post.save();
  
      // Return the updated post
      res.status(200).json(post);
    } catch (error) {
      console.error('Error liking post:', error);
      res.status(500).json({ message: 'Error liking post', error });
    }
  });
  
  // Route to comment on a post
  router.post('/comment/:postId', authenticateToken, async (req, res) => {
    const { postId } = req.params;
    const { comment } = req.body;  // Assuming the comment is sent in the body
    const userId = req.user.name; // Assuming `name` is the unique identifier for users
  
    try {
      // Find the post by its ID
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }
  
      // Add the new comment to the post
      post.comments.push({ user: userId, comment });
      await post.save();
  
      // Return the updated post with the new comment
      res.status(200).json(post);
    } catch (error) {
      console.error('Error commenting on post:', error);
      res.status(500).json({ message: 'Error commenting on post', error });
    }
  });
  
// Route to get a single post by its ID
router.get('/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        // Find the post by its ID
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        // Return the found post
        res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ message: "Error fetching post", error });
    }
});

router.post('/report/:postId', authenticateToken, async (req, res) => {
    const { postId } = req.params;
    const { abuseType, comment } = req.body;
    const userId = req.user._id; // Get the userId from the authenticated user
  
    try {
      if (!abuseType || !comment) {
        return res.status(400).json({ message: "Abuse type and comment are required." });
      }
  
      // Create a new report entry
      const report = new Report({
        post: postId,
        user: userId, // Use the actual ObjectId of the logged-in user
        abuseType,
        comment,
      });
  
      await report.save();
  
      // Now, add this report to the post's reports array
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }

      // Add the new report to the post's reports array
      post.reports.push(report._id);
      await post.save();
  
      res.status(200).json({ message: "Post reported successfully." });
    } catch (error) {
      console.error("Error reporting post:", error);
      res.status(500).json({ message: "Error reporting post", error });
    }
});

  


export default router;
