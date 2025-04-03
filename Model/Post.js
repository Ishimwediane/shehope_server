import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    author: { type: String }, // This will come from the token
    profileName: { type: String, required: true }, // User's full name (also from token)
    content: { type: String, required: true },
    likes: { type: [String], default: [] }, // Store an array of user IDs who liked the post
    comments: [
      {
        user: { type: String, required: true }, // User who commented
        comment: { type: String, required: true }, // The comment text
        date: { type: Date, default: Date.now },
      },
    ],
    reports: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Report',
        },
      ],
    date: { type: Date, default: Date.now },
    
  },
  
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
