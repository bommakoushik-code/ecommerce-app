const jwt = require('jsonwebtoken');
const User = require('../models/User');

/*
 * Middleware to verify JWT tokens and protect routes. The protect
 * function checks the Authorization header for a bearer token and
 * attaches the decoded user to req.user. The admin function
 * authorises admin users.
 */
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yoursecretkey');
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorised, token failed' });
    }
  }
  res.status(401).json({ message: 'Not authorised, no token' });
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Not authorised as admin' });
};

module.exports = { protect, admin };