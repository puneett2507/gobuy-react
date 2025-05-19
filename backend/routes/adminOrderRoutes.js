const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddlware");

const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all orders (admin only)
// @access Private/Admin only
router.get("/", protect, admin, async (req, res) => {
  try {
    let orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/admin/orders/:id
// @desc Update order status
// @access Private/Admin only
router.put("/:id", protect, admin, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt =
        req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

      const updatedOrder = await order.save();
      res
        .status(200)
        .json({ message: "Order status updated successfully", updatedOrder });
    } else {
      return res.status(400).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/admin/orders/:id
// @desc Delete order (admin only)
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    if (order) {
      await order.deleteOne();
      return res.status(200).json({ message: "Order deleted successfully" });
    } else {
      return res.status(400).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
