const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth-routes");
const contactRoutes = require("./routes/contact-router");
const adminRoutes = require("./routes/admin-route");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Load env
dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/form", contactRoutes);
app.use("/api/admin",adminRoutes); 
app.use("/api/admin/contacts",contactRoutes); 

// Error Middleware
app.use(errorMiddleware);

// DB + Server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
