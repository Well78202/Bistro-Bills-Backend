const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const path = require("node:path");
const cors = require('cors');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

app.use(express.static(path.join(__dirname, "")));

// Routes
app.use("/products", productRoutes);
app.use("/user", userRoutes);

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
