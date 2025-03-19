import nodemailer from "nodemailer";

export const sendReminderEmail = async (event, userEmail) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_NAME, // Email sender
      pass: process.env.EMAIL_PASS, // Email password
    },
  });

  const mailOptions = {
    from: `"SheHope Team" <${process.env.EMAIL_NAME}>`, // Sender
    to: userEmail, // ✅ Send to user's email
    subject: `Reminder: ${event.title}`,
    text: `Hello ${event.userName},\n\nYou have an event scheduled: ${event.description} on ${event.date}.\n\nBest regards,\nSheHope Team`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📨 Email Sent to ${userEmail}! Message ID: ${info.messageId}`);
  } catch (error) {
    console.error("❌ Email Sending Failed:", error);
    throw error;
  }
};
