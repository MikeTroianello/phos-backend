require('dotenv').config();
var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Collection = require('../models/Collection');

const chalk = require('chalk');

const { check, validationResult } = require('express-validator/check');

const auth = require('../middleware/auth');
const getId = require('../middleware/getId')

/* GET users listing. */
router.get('/', auth, async (req, res, next) => {
  try {
    console.log(chalk.blueBright('HERE'));
    const user = await User.findById(req.user.id).select('-password');
    console.log(chalk.green(user));
    res.json({ user });
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
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
              const payload = {
                user: {
                  id: newUser.id,
                },
              };

              jwt.sign(
                payload,
                process.env.SECRET,
                {
                  expiresIn: 360000,
                },
                (err, token) => {
                  if (err) throw err;
                  else {
                    res.json({ token });
                  }
                }
              );

              // res.json({ message: 'USER CREATED', newUser: newUser });
            }
          });
        })
        .catch((error) => {
          next(error);
        });
    }
  }
);

//LOG IN
router.post(
  '/login',
  [check('username', 'Please include a username').exists()],
  [check('password', 'Please include a password').exists()],
  async (req, res) => {
    // console.log(chalk.greenBright(req.body));
    let { username, password } = req.body;

    let user = await User.findOne({
      lowerCaseUsername: username.toLowerCase(),
    });

    if (!user) {
      return res.json({ message: 'Username not found' });
    }

    // const salt = bcrypt.genSaltSync(bcryptSalt);
    // const hashPass = bcrypt.hashSync(password, salt);

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ message: 'Password was incorrect' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600000,
      },
      (err, token) => {
        if (err) throw err;
        else {
          res.json({ token });
        }
      }
    );
  }
);

//TEST LOGIN
router.get('/checkLogin', auth, async (req,res) => {
  try{
  console.log(req.user.id)
  let user = await User.findById(req.user.id)
  console.log("SUCCESS????", user)
  res.json({msg:'successs'})
  }catch(err){
    console.log("FAIL")
    res.json({msg: "FAILURE"})
  }
})

//PROFILE PAGE
router.get('/profiles/:username', getId, async (req,res)=>{
  try{let lower = req.params.username.toLowerCase()
  let user = await User.findOne({lowerCaseUsername: lower}).populate('collections')
  // let collections = await Collection.find({creatorId: req.user.id})
  // console.log(chalk.redBright(collections))
  console.log(chalk.greenBright(user))
  res.json(user)
}catch(err){
    console.log(err)
    res.json(err)
  }
})

module.exports = router;
