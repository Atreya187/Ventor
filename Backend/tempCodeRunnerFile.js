
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const reportRoutes =
require("./routes/reportRoutes");

const app = express();

/* CONNECT DATABASE */

connectDB();

/* MIDDLEWARE */

app.use(cors());
app.use(express.json());

/* ROUTES */

app.use("/api",reportRoutes);

/* TEST ROUTE */

app.get("/",(req,res)=>{
res.send("API running");
});

/* START SERVER */

const PORT = 5000;

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`);
});