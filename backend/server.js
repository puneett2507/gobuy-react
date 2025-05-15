const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT;

// connection to mongodb
connectDB();

app.get("/", (req, res) => {
  res.send("GoBuy backend");
});

// API routes
// user routes
app.use("/api/users", userRoutes);
// product routes
app.use("/api/products", productRoutes);
// cart routes
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
