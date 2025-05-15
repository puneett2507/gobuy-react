const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddlware");

const router = express.Router();

// @route POST /api/products
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
    } = req.body;

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

    const createdProduct = await product.save();
    res.status(200).json(createdProduct);
  } catch (error) {
    console.log("Error fetching data: ", error);
    res.status(500).json({ message: "Server Error", error: error });
  }
});

// @route PUT /api/products/:id
// @desc Update a product using ID
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
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
    } = req.body;

    // find product by id
    const product = await Product.findById(req.params.id);

    if (product) {
      // update fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Error updating product", error: error });
  }
});

// @route DELETE /api/products/:id
// @desc Delete a product using ID
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    // find product using id
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Server Error", error: error });
  }
});

// @router GET /api/products
// @desc Get all products with optional query filter
// @access Public
router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      brand,
      material,
      minPrice,
      maxPrice,
      gender,
      sortBy,
      search,
      category,
      limit,
    } = req.query;

    let query = {};

    // Filter logic
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }

    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (size) {
      query.size = { $in: size.split(",") };
    }

    if (color) {
      query.color = { $in: [color] };
    }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // sort logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    // fetch products
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    res.json(products);
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ message: "Server Error", error: error });
  }
});

// @route GET /api/products/best-seller
// @desc Retrive product with highest rating
// @access Public
router.get("/best-seller", async (req, res) => {
  try {
    let bestseller = await Product.findOne().sort({ rating: -1 });
    if (bestseller) {
      res.json(bestseller);
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ message: "Server Error", error: error });
  }
});

// @route GET /api/products/new-arrival
// @desc Retrive latest products using creation date
// @access Public
router.get("/new-arrival", async (req, res) => {
  try {
    let newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    if (newArrivals) {
      res.json(newArrivals);
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ message: "Server Error", error: error });
  }
});

// @route GET /api/products/:id
// @desc Get a single Product by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ message: "Server Error", error: error });
  }
});

// @route GET /api/products/similar/:id
// @desc Get similar products based on current product gender and category
// @access Public
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ message: "Server Error", error: error });
  }
});

module.exports = router;
