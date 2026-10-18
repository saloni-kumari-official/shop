const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/shopstock")
  .then(() => {
    console.log("MongoDB connected successfully ✅");
  })
  .catch((error) => {
    console.error("MongoDB connection failed ❌", error.message);
  });

app.get("/", (req, res) => {
  res.json({
    message: "ShopStock API is running 🚀",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});