import express from 'express';
import {
  Login,
  registerUser,
  getUserById
} from '../Controller/User.Controller.js';

import Blog from '../Model/BlogModel.js'; // Import Blog model
import Tip from '../Model/TipsModel.js'; // Import Tip model
import { updateUser } from '../Controller/User.Controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', Login);
router.get('/:id', getUserById); 
router.put('/user/users/:userId', updateUser); // Use your authentication middleware here



export default router;
