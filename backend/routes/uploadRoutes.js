const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();

const router = express.Router();

// setup cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route GET /api/upload
// @desc Upload images
// @Access public
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // handle upload to cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        // streamline to convert file buffer to stream
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };
    // call function
    const result = await streamUpload(req.file.buffer);

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.log("Error uploading file: ", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
