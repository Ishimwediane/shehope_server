import mongoose from "mongoose";

const TipSchema = new mongoose.Schema({
  message: 
  {
     type: String, 
     required: true 
    }, // The tip content
    trimester: {
      type: String,
      enum: ["first", "second", "third"],
      required: true,
    },
    icon:
     { type: String, default: "" 
      
     }, // New field for tip icon
  createdAt: 
  {
     type: Date, 
     default: Date.now 
    },
});

const Tip = mongoose.model("Tip", TipSchema);
export default Tip;
