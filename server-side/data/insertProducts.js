const Product = require('../models/products'); 
const productsData = require('./productsData'); 

async function insertProducts() {
    try {
        console.log('Attempting to insert products...');
        
      
        for (const product of productsData) {
          
            const existingProduct = await Product.findOne({ name: product.name }); 

          
            if (!existingProduct) {
                await Product.create(product);
                console.log(`Product "${product.name}" inserted successfully`);
            } else {
                console.log(`Product "${product.name}" already exists, skipping insertion`);
            }
        }
        
        console.log('All products inserted/checked successfully');
    } catch (error) {
        console.error('Error inserting products:', error);
    }
}

module.exports = insertProducts;
