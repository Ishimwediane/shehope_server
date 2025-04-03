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
    link: 
    { 
      type: String, default: ""

     }, // New field for external link
  createdAt: 
  { 
    type: Date, 
    default: Date.now 
},
});

const Blog =mongoose.model("Blog",BlogSchema)
export default Blog;
