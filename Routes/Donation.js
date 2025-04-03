import express from 'express';
import multer from 'multer';
import DonationRequest from '../Model/Donation.js';
import {authenticateToken} from '../Middlewares/authMiddleware.js';
import path from 'path';

const router = express.Router();

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage });

// POST request to create a new donation request
router.post('/', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { donationType, amountNeeded, address, phoneNumber, description } = req.body;
    const userId = req.user._id;  // Use the authenticated user's ID
    let filePath = null;

    // Check if a file was uploaded
    if (req.file) {
      filePath = req.file.path;  // Save the path of the uploaded file
    }

    const newDonationRequest = new DonationRequest({
      donationType,
      amountNeeded,
      address,
      phoneNumber,
      description,
      file: filePath,
      user: userId,  // Store the userId with the donation request
    });
    

    await newDonationRequest.save();
    res.status(201).json({ message: 'Donation request submitted successfully!', donationRequest: newDonationRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while submitting the donation request.' });
  }
});

export default router;
