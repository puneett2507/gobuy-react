const express = require("express");
const Subscriber = require("../models/Subscriber");

const router = express.Router();

// @route POST /api/subscriber
// @desc Handle newsletter subscription
// @access Public
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    let subscriber = await Subscriber.findOne({ email });

    // checking if email already exists
    if (subscriber) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    // creating new subscriber
    subscriber = new Subscriber({ email });

    await subscriber.save();

    res.status(200).json({ message: "Successfully subscribed to newsletter!" });
  } catch (error) {
    console.log("Error subscribing: ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
