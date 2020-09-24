var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("IT'S BEEN GOT");
  res.json({ message: 'Welcome to the Phos Backend' });
  // res.render('index', { title: 'Express' });
});

module.exports = router;
