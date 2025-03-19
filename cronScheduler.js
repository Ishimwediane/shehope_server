import cron from "node-cron";
import Event from "./Model/Event.js";  
import User from "./Model/UserModel.js";  // ✅ Import User model
import { sendReminderEmail } from "./Utils/EmailSender.js";

const checkAndSendReminders = async () => {
    console.log("🔍 Checking for events that need reminders...");
  
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    try {
      const events = await Event.find({ 
        date: today, 
        reminder: true, 
        notificationSent: false 
      }).populate("userId");  // Populate the userId field
  
      if (events.length === 0) {
        console.log("✅ No events needing reminders today.");
        return;
      }
  
      console.log(`Found ${events.length} event(s) to process`);
  
      for (const event of events) {
        if (!event.userId || !event.userId.email) {
          console.log(`⚠️ No email found for user ${event.userId?._id}`);
          continue;
        }
  
        await sendReminderEmail(event, event.userId.email);
        event.notificationSent = true;
        await event.save();
        console.log(`📧 Reminder sent for event: ${event.title} to ${event.userId.email}`);
      }
  
    } catch (error) {
      console.error("❌ Error in reminder system:", error.message);
    }
  };
  

// 🔄 Schedule the cron job to run daily at midnight
cron.schedule("0 0 * * *", checkAndSendReminders);




// 🚀 Manually trigger the reminder system for testing
export const testReminders = async () => {
  console.log("🚨 Running reminder test manually...");
  await checkAndSendReminders();
};
