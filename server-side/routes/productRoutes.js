const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Product = require('../models/products.js');


router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
    try {
      const { name, price, description, category, images } = req.body;
      const newProduct = new Product({ name, price, description, category, images });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
      const { name, price, description, category, images } = req.body;

      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      if (name) existingProduct.name = name;
      if (price) existingProduct.price = price;
      if (description) existingProduct.description = description;
      if (category) existingProduct.category = category;
      if (images) existingProduct.images = images;

      const updatedProduct = await existingProduct.save();
      res.json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  

module.exports = router;
