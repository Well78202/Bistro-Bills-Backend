const Product = require("../models/Product");

// Get all products (Read)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID (Read)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });

    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found in this category" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a product (Create)
const addProduct = async (req, res) => {
  try {
    // Extract product details from request body
    const { name, price, description, category, image } = req.body;
    let productImg = req.file
    // Create a new product instance
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID (Update)
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;

    // Find the product by ID and update its details
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, image },
      { new: true, runValidators: true }
    );

    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product (Delete)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  addProduct,
  updateProduct,
  getProductsByCategory
};
