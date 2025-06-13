const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const checkoutRoutes = require("./routes/checkoutRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const subscriberRoutes = require("./routes/subscriberRoutes.js");
const adminUserRoutes = require("./routes/adminUserRoutes.js");
const adminProductRoutes = require("./routes/adminProductRoutes.js");
const adminOrderRoutes = require("./routes/adminOrderRoutes.js");

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
// checkout routes
app.use("/api/checkout", checkoutRoutes);
//order routes
app.use("/api/orders", orderRoutes);
// subscriber routes
app.use("/api", subscriberRoutes);

// upload routes
app.use("/api/upload", uploadRoutes);

// admin user routes
app.use("/api/admin/users", adminUserRoutes);
// admin product routes
app.use("/api/admin/products", adminProductRoutes);
// admin order routes
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
