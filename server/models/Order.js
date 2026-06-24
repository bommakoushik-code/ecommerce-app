const mongoose = require('mongoose');

/*
 * Order schema for the e‑commerce application. Each order belongs to
 * a user and contains an array of purchased items. Each item
 * references a product, with quantity and price at time of order.
 */
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number
    }
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);