const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a product
router.get("/:id", getProduct, async (req, res) => {
  res.json(res.product);
});

// Delete a product
router.delete("/:id", getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: "Deleted Product" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create product
router.post("/", async (req, res) => {
  const data = req.body;

  const check = await Product.findOne({ name: data.name }).exec();
  if (check) return console.log("This product has already been added !");

  const product = new Product({
    name: data.name,
    brand: data.brand,
    price: data.price,
    inventory: data.inventory,
    date: data.date,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update product
router.patch("/:id", getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.brand != null) {
    res.product.brand = req.body.brand;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.inventory != null) {
    res.product.inventory = req.body.inventory;
  }
  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Check product function
async function getProduct(req, res, next) {
  let product;

  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Cannot find product !" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

module.exports = router;
