var express = require('express');
var router = express.Router();

const Card = require('../models/Card');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create', (req, res) => {
  console.log('CREATING', req.body);

  const {
    type,
    title,
    description,
    example,
    reference,
    tags,
    creatorId,
    hideCreator,
    public,
  } = req.body;

  let tagArr = tags.split(' ');

  const newCard = new Card({
    type,
    title,
    description,
    example,
    reference,
    tags: tagArr,
    creatorId,
    hideCreator,
    public,
  });

  console.log('THIS IS THE NEW CARD', newCard);

  newCard.save((err) => {
    if (err) {
      console.log('ERROR', err);
      res.json(err);
    } else {
      res.json({ message: 'SUCCESSSS', newCard: newCard });
    }
  });
});

module.exports = router;
