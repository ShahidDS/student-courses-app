import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentRoutes from "./routes/students.js";
import courseRoutes from "./routes/courses.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;

console.log("🔌 Connecting to MongoDB...");

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log("📊 Database:", mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err.message);
  });

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running 🚀",
    database:
      mongoose.connection.readyState === 1 ? "Connected ✅" : "Disconnected ❌",
    timestamp: new Date().toISOString(),
  });
});

// Welcome route
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Student Management API</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 40px; 
            line-height: 1.6;
            background: #f5f5f5;
          }
          .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 { color: #333; }
          .status { 
            padding: 10px; 
            border-radius: 5px; 
            margin: 10px 0;
          }
          .connected { background: #d4edda; color: #155724; }
          .endpoint { 
            background: #f8f9fa; 
            padding: 15px; 
            margin: 10px 0; 
            border-left: 4px solid #007bff;
            border-radius: 5px;
          }
          a { 
            color: #007bff; 
            text-decoration: none; 
            font-weight: bold;
          }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎓 Student Management API</h1>
          <div class="status ${
            mongoose.connection.readyState === 1 ? "connected" : ""
          }">
            📍 Server: http://localhost:${PORT}<br>
            🗄️ MongoDB: ${
              mongoose.connection.readyState === 1
                ? "Connected ✅"
                : "Disconnected ❌"
            }
          </div>
          
          <h2>📚 Available Endpoints:</h2>
          
          <div class="endpoint">
            <strong>GET</strong> <a href="/api/students">/api/students</a> - Get all students
          </div>
          <div class="endpoint">
            <strong>GET</strong> <a href="/api/courses">/api/courses</a> - Get all courses
          </div>
          <div class="endpoint">
            <strong>GET</strong> /api/health - Check server status
          </div>
          
          <h3>🔧 Testing Instructions:</h3>
          <ol>
            <li>Use <strong>Insomnia</strong> or <strong>Postman</strong> to test POST requests</li>
            <li>First, create some courses using POST /api/courses/samples</li>
            <li>Then create students using POST /api/students</li>
            <li>Finally, enroll students using POST /api/students/:studentId/enroll/:courseId</li>
          </ol>
        </div>
      </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API Documentation: http://localhost:${PORT}`);
});
