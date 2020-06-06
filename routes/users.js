var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const User = require('../models/User');

const chalk = require('chalk');

const { check, validationResult } = require('express-validator/check');

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('THIS WORKS');
  res.json({ message: 'respond with a resource' });
});

//SIGN UP
router.post(
  '/signup',
  [check('username', 'Please include a username').not().isEmpty()],
  [check('password', 'Please include a password').not().isEmpty()],
  (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let phone = req.body.phone;

    // if (!username || !password) {
    //   return res.json({
    //     message: 'Please include both a username and password',
    //   });
    // }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(chalk.red('FAIL'));
      res.status(422).json({ errors: errors.array().map((err) => err.msg) });
    } else {
      let lowerCaseUsername = username.toLowerCase();
      // password = password.toLowerCase();

      User.findOne({ lowerCaseUsername })
        .then((user) => {
          if (user !== null) {
            console.log(chalk.redBright('USER EXISTS'));
            res.json({ message: 'The username already exists' });
            return;
          }

          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(password, salt);

          const newUser = new User({
            username,
            lowerCaseUsername,
            password: hashPass,
            email,
            phone,
          });

          newUser.save((err) => {
            if (err) {
              res.json({ message: err });
            } else {
              res.json({ message: 'USER CREATED', newUser: newUser });
            }
          });
        })
        .catch((error) => {
          next(error);
        });
    }
  }
);

module.exports = router;
