import express from 'express';
import {
  Login,
  registerUser,
  getUserById,
  registerAdmin
} from '../Controller/User.Controller.js';

import Blog from '../Model/BlogModel.js'; // Import Blog model
import Tip from '../Model/TipsModel.js'; // Import Tip model
import { updateUser } from '../Controller/User.Controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/register-admin', registerAdmin); 
router.post('/login', Login);
router.get('/:id', getUserById); 
router.put('/user/users/:userId', updateUser); // Use your authentication middleware here

router.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find user by ID from the database
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user); // Log user data to verify what is being sent back
    res.json(user); // Send the user data as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
