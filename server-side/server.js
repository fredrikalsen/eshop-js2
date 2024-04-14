const express = require('express');
const mongoose = require('mongoose');
const insertProducts = require('./data/insertProducts');
const Product = require('./models/products.js');
const cors = require('cors');
const messageRoutes = require('./routes/messageRoutes');
const productRoutes = require('./routes/productRoutes'); 

require('dotenv').config();

const PORT = process.env.PORT || 9999;
const mongoURI = process.env.MONGO_URI;

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/messages', messageRoutes);

app.use('/api/products', productRoutes);

insertProducts();

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => console.log('Server running on: http://localhost:' + PORT));
  })
  .catch(err => {
    console.error('Error connecting to DB:', err.message);
    process.exit(1);
  });
