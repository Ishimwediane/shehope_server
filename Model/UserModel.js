import mongoose from "mongoose";
const {model,Schema} =mongoose;
const userSchema =Schema(
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
         required:true
        },
      location: { 
        type: String 
    },
     
      trimester: {
         type: String,
          enum: ["first", "second", "third"], 
         required:true
        
        },
      emergency_contact: {
         type: String 
        }, // Optional emergency contact number
      profile_picture: { 
        type: String 
    }, // URL of the profile picture
      bio: { 
        type: String 
    }, 
      createdAt: { type: Date, default: Date.now },
      tokens: {
        accessToken: { type: String },  // <-- Add this to store the token
      },
    },
    { timestamps: true }
  );
  
  const User = model("User", userSchema);
 export default User;
  