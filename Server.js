import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import UserRoutes from './Routes/User.Routes.js';
import tipRoutes from "./Routes/Tips.Routes.js";
import blogRoutes from './Routes/Blog.Routes.js';
import blogTipRoutes from './Routes/BlogTipRoutes.js';
import eventRoutes from './Routes/Event.Routes.js'; // ✅ Event routes
import communityRoutes from './Routes/Community.Routes.js';
import adminRoutes from './Routes/Admin.js'; // Import the admin routes


import errorHandler from './Middlewares/errorHandler.js';
import cors from "cors";
import './cronScheduler.js';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, 
}));

app.use(express.json());
app.use(errorHandler);

// ✅ Routes
app.use('/api/user', UserRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api", blogTipRoutes);
app.use("/api/events", eventRoutes);
app.use('/api/posts', communityRoutes);
app.use("/api/admin", adminRoutes); // Add the admin routes
app.get('/', (req, res) => {
  res.send('Welcome to SheHope API!');
});



app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
