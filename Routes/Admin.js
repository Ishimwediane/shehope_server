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



export default router;
