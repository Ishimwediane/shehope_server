import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title:
   {
     type: String, 
     required: true 
    },
  content: 
  { 
    type: String,
     required: true 
    },
    image: { 
        type: String, 
        default: "" 
    },
    trimester: {
      type: String,
      enum: ["first", "second", "third"],
      required: true,
    }, 
  createdAt: 
  { 
    type: Date, 
    default: Date.now 
},
});

const Blog =mongoose.model("Blog",BlogSchema)
export default Blog;
