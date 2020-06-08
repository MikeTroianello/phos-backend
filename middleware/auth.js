require('dotenv').config();
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No json-token was found' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = decoded.user;
    next();
  } catch {
    res.status(401).json({ message: 'json-token is invalid' });
  }
};
