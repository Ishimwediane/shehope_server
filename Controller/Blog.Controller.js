import cloudinary from "../Utils/Cloudinary.js";
import Blog from "../Model/BlogModel.js";
import User from "../Model/UserModel.js";
import multer from "multer";
import { Readable } from "stream";

// Use memory storage to prevent local file system errors
const storage = multer.memoryStorage();
const upload = multer({ storage });
export const uploadMiddleware = upload.single("image");

// Create Blog Post
export const createBlog = async (req, res) => {
  try {
    const { title, content, trimester } = req.body;
    if (!title || !content || !trimester) {
      return res.status(400).json({ message: "Title, content, and trimester are required" });
    }

    let uploadedImageUrl = "https://res.cloudinary.com/dfe7ue90j/image/upload/v1741710271/first_semester_nt69qn.jpg";

    if (req.file) {
      try {
        const stream = Readable.from(req.file.buffer);
        const cloudinaryUpload = new Promise((resolve, reject) => {
          const cloudinaryStream = cloudinary.uploader.upload_stream(
            { folder: "images", resource_type: "auto" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.pipe(cloudinaryStream);
        });

        const cloudinaryResponse = await cloudinaryUpload;
        uploadedImageUrl = cloudinaryResponse.secure_url;
      } catch (cloudinaryError) {
        return res.status(500).json({ message: "Error uploading image", error: cloudinaryError });
      }
    }

    const newBlog = await Blog.create({
      title,
      content,
      image: uploadedImageUrl,
      trimester, // ✅ Save trimester
    });

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
};


// Get All Blogs
// Get All Blogs for a specific user
export const getBlogs = async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query params
    
    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    // Fetch user details (you should have a User model to get user data)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { trimester } = user; // Get trimester from the user document

    // Fetch blogs for that specific trimester
    const blogs = await Blog.find({ trimester }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};


