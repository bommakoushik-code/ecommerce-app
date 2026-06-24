const mongoose = require('mongoose');

/*
 * Product schema for the e‑commerce application. Products contain
 * a name, description, price, optional image URL, stock quantity
 * and a created date.
 */
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  stock: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);