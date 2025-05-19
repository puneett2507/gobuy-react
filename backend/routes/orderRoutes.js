const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddlware");

const router = express.Router();

// @route GET /api/orders/my-orders
// @desc Get logged-in user orders
// @access Private
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    console.log("Error fetching ordres: ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route GET /api/orders/my-orders/:id
// @desc Get order by id
// @access private
router.get("/my-orders/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    console.log("Error fetching ordres: ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
