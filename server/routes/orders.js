const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

/*
 * Order routes allow authenticated users to place orders
 * and view their order history. Admins can view all orders.
 */

// GET /api/orders – list orders for the current user (or all if admin)
router.get('/', protect, async (req, res) => {
  try {
    let orders;
    if (req.user.role === 'admin') {
      orders = await Order.find({}).populate('user', 'name email');
    } else {
      orders = await Order.find({ user: req.user._id }).populate('user', 'name email');
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/orders – create a new order
router.post('/', protect, async (req, res) => {
  const { items } = req.body;
  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items provided' });
    }
    const order = new Order({
      user: req.user._id,
      items: items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price
      })),
      total: items.reduce((acc, item) => acc + item.quantity * item.price, 0)
    });
    const created = await order.save();
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;