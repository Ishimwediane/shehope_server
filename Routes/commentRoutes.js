// Routes/commentRoutes.js
import express from 'express';
import Comment from '../Model/Comment.js';

const router = express.Router();

// Get all comments
router.get('/', async (req, res) => {
  try {
    console.log('Fetching comments...'); // Debugging statement
    const comments = await Comment.find().populate('userId', 'name'); // Populate userId to get user names
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

// Post a new comment
router.post('/', async (req, res) => {
  const { userId, content } = req.body;
  try {
    const newComment = new Comment({ userId, content });
    await newComment.save();
    res.status(201).json({ comment: newComment });
  } catch (error) {
    console.error('Error posting comment:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error posting comment' });
  }
});

export default router;