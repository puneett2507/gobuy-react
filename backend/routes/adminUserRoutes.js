const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddlware");

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users(Admin only)
// @access PRIVATE/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/admin/users
// @desc Add a new user (Admin Only)
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({
      name,
      email,
      password,
      role: role || "customer",
    });

    await user.save();

    res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/admin/users/:id
// @desc Update user info
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.role = req.body.role || user.role;
    }
    const updatedUser = await user.save();
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/admin/users/:id
// @desc Delete user
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();

      const updatedUsers = await User.find();
      return res
        .status(200)
        .json({ message: "User deleted successfully", users: updatedUsers });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching users: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
