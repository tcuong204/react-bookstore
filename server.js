const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
app.use(express.json()); // Để xử lý JSON trong request body
const corsOptions = {
  origin: "http://localhost:3000", // Chỉ cho phép từ localhost:3001
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // Cho phép gửi cookie hoặc xác thực
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Sử dụng routes
app.use("/api/auth", authRoutes);
// Khởi chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
