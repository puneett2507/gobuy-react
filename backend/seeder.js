const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

// seed data
const seedData = async () => {
  try {
    // delete existing users and products
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // create new user admin
    const createdUser = await User.create({
      name: "Admin user",
      email: "admin@gobuy.com",
      password: "123456",
      role: "admin",
    });

    // assign default user id to each product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    // insert data
    await Product.insertMany(sampleProducts);

    console.log("Product data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data: ", error);
    process.exit(1);
  }
};

seedData();
