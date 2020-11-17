require('dotenv').config();
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

module.exports = (req, res, next) => {
  console.log(chalk.redBright("HERE"))
  const token = req.header('x-auth-token');
  console.log(chalk.redBright(token))
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user.id = decoded.user.id; 
    next();
  } catch {
    req.user={id:null}
    next()
  }
};
