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

// @route POST /api/admin/products
// @desc Create new product
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body.productData;

    console.log("req.body", req.body.productData);

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id, // reference to admin id
    });

    console.log("Product", product);

    const createdProduct = await product.save();
    res.status(200).json({
      message: "Product created successfully!",
      product: createdProduct,
    });
  } catch (error) {
    console.log("Error fetching data: ", error);
    res.status(500).json({ message: "Server Error", error: error });
  }
});

module.exports = router;
