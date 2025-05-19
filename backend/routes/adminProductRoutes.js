const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddlware");

const router = express.Router();

// @route GET /api/admin/products
// @desc Get all products (admin only)
// @access Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    let products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
