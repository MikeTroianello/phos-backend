var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('THIS WORKS');
  res.json({ message: 'respond with a resource' });
});

router.post('/signup', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let phone = req.body.phone;

  console.log('STARTING SIGN UP', req.body);

  if (!username || !password) {
    return res.json({ message: 'Please include both a username and password' });
  }

  console.log('USERNAME', username, username.toLowerCase());
  username = username.toLowerCase();
  password = password.toLowerCase();

  console.log('oh no.....');

  User.findOne({ username })
    .then((user) => {
      console.log('USER FOUND:', user);
      if (user !== null) {
        res.json({ message: 'The username already exists' });
        return;
      }

      console.log('IT DIDNT BREAK WITH USER FIND ONE');
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass,
        email,
        phone,
      });

      console.log('almost there', newUser);

      newUser.save((err) => {
        if (err) {
          console.log('HERE');
          res.json({ message: err });
        } else {
          // req.login(newUser, (err) => {
          //   if (err) {
          //     res.status(500).json({ message: 'Login after signup went bad.' });
          //     return;
          //   }
          //   res.status(200).json({
          //     message: 'User has been created',
          //     user: newUser,
          //   });
          // });
          res.json({ message: 'SUCCESSSS', newUser: newUser });
        }
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
