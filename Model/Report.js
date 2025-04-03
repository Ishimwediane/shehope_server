import mongoose from "mongoose";
const reportSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    abuseType: { type: String, required: true },  // Type of abuse (e.g., 'Spam', 'Hate Speech', etc.)
    comment: { type: String, required: true },    // User's comment for the report
    createdAt: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false },
  });
  
  const Report = mongoose.model("Report", reportSchema);
  export default Report
  