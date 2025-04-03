import mongoose from 'mongoose';

const donationRequestSchema = new mongoose.Schema({
  donationType: {
    type: String,
    required: true,
  },
  amountNeeded: {
    type: Number,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
}, { timestamps: true });

const DonationRequest = mongoose.model('DonationRequest', donationRequestSchema);

export default DonationRequest;
