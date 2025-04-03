import mongoose from "mongoose";
const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true
    },
    last_name: { 
      type: String, 
      required: true
    },
    email: { 
      type: String, 
      unique: true, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    date_of_birth: {
      type: Date,
      required: true
    },
    location: { 
      type: String 
    },
    trimester: {
      type: String,
      enum: ["first", "second", "third"],
      required: function() {
        return !this.isAdmin; // Make trimester required only if the user is not an admin
      }
    },
    emergency_contact: {
      type: String 
    },
    profile_picture: { 
      type: String 
    },
    bio: { 
      type: String 
    },
    
    isAdmin: { type: Boolean, default: false }, // Admin flag
    createdAt: { type: Date, default: Date.now },
    tokens: {
      accessToken: { type: String },  // Add this to store the token
    },
  },
  { timestamps: true }
);

// Avoid overwriting the User model
const User = mongoose.models.User || model("User", userSchema);
export default User;
