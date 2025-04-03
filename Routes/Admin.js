import express from 'express';
import { adminAuth } from '../Middlewares/AdminAuth.js';
import { authenticateToken } from '../Middlewares/authMiddleware.js';
import {
  getAllUsers,
  deleteUser,
  updateUser,
  getAllPostsForAdmin,  
  resolveReport,         
  deletePost,
  deleteComment, 
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  createTip,
  getAllTips,
  updateTip,
  deleteTip, 
  getAllDonations, 
  updateDonation, 
  getEvents, createEvent,   
  updateEvent,
  deleteEvent
} from '../Controller/AdminController.js';


const router = express.Router();

// Protect all routes with adminAuth and authenticateToken
router.use(authenticateToken);
router.use(adminAuth);

// Admin routes to manage users
router.get('/users', getAllUsers);  // View all users
router.delete('/users/:id', deleteUser);  // Delete a user by ID
router.put('/users/:id', updateUser);  // Update user info

// Admin routes to manage posts and reports

router.get("/posts", getAllPostsForAdmin); // View all posts with reports
router.put("/posts/:postId/reports/:reportId/resolve", resolveReport); // Resolve a report on a post
router.delete("/posts/:postId", deletePost); // Delete a post
router.delete("/posts/:postId/comments/:commentId", deleteComment); // Delete a comment from a post

// Routes for Blogs
router.post("/blogs", createBlog);
router.get("/blogs", getAllBlogs);
router.put("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);

// Routes for Tips
router.post("/tips", createTip);
router.get("/tips", getAllTips);
router.put("/tips/:id", updateTip);
router.delete("/tips/:id", deleteTip);

// Route to get all donations for admin
router.get('/donations', getAllDonations);
// Route to update a donation (e.g., approve, reject)
router.put('/donations/:donationId',  updateDonation);


router.get("/event", getEvents);
router.post("/event", createEvent);
router.put('/events/:id', updateEvent);  // Update event by ID
router.delete('/events/:id', deleteEvent);  // Delete event by ID
export default router;
