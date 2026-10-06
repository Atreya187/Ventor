const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Essential to read your .env file

const connectDB = require("./config/db");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

/* CONNECT DATABASE */
// Ensure your config/db.js uses process.env.MONGO_URI to connect to Atlas
connectDB();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api", reportRoutes);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Ventor API running on MongoDB Atlas");
});

/* START SERVER */
// Uses PORT from .env if available, otherwise defaults to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});