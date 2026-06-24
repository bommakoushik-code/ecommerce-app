const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/*
 * User routes for registration and login. Tokens are generated
 * using JWT and include the user id. The JWT secret should be
 * stored securely in the environment.
 */

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id);
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login a user and return a token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      return res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token });
    }
    res.status(401).json({ message: 'Invalid email or password' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'yoursecretkey', {
    expiresIn: '30d'
  });
}

module.exports = router;