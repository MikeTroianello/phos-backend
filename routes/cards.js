var express = require('express');
var router = express.Router();
const chalk = require('chalk');

const Card = require('../models/Card');

const { check, validationResult } = require('express-validator/check');

// router.post(
//   '/create',
//   [
//     check('type', 'You must include a Type').not().isEmpty(),
//     check('title', 'You must include a Title').not().isEmpty(),
//     check('description', 'You must include a Description').not().isEmpty(),
//   ],
//   (req, res) => {
//     const errors = validationResult(req);
//     console.log('I AM ERROR', errors);
//     if (!errors.isEmpty()) {
//       console.log(chalk.red('FAIL'));
//       res.status(422).json({ errors: errors.array().map((err) => err.msg) });
//     } else {
//       console.log(check);
//       res.json(req.body);
//     }
//   }
// );

//GET ALL CARDS
router.get('/all', async (req, res) => {
  let allCards = await Card.find();
  console.log('GETTING ALL CARDS', allCards);
  res.json(allCards);
});

//GET ONE CARD
router.get('/view/:cardId', async (req, res) => {
  let card = await Card.findById(req.params.cardId);
  res.json(card);
});

//CREATE CARD

router.post(
  '/create',
  [
    check('type', 'You must include a Type').not().isEmpty(),
    check('title', 'You must include a Title').not().isEmpty(),
    check('description', 'You must include a Description').not().isEmpty(),
  ],
  (req, res) => {
    console.log('CREATING', req.body);

    let {
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

    if (tags) {
      tags = tags.split(' ');
    }

    const newCard = new Card({
      type,
      title,
      description,
      example,
      reference,
      tags,
      creatorId,
      hideCreator,
      public,
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(chalk.red('FAIL'));
      res.status(422).json({ errors: errors.array().map((err) => err.msg) });
    } else {
      console.log(chalk.cyan('next step'));
      newCard.save((err) => {
        if (err) {
          console.log('ERROR', err);
          res.json(err);
        } else {
          res.json({ message: 'SUCCESSSS', newCard: newCard });
        }
      });
    }
  }
);

//THIS MAY BE MOVED TO THE USER, AS AN IMPORTANT IS ONLY IMPORTANT TO THEM

//DENOTE IMPORTANT CARD
// router.patch('/important/:cardId', async (req, res) => {
//   console.log('UPDATING IMPORTANT');
//   let updatedCard = await Card.updateOne(
//     { _id: req.params.id },
//     { $set: { important: !important } }
//   );
//   res.json(updatedCard);
// });

//DELETE CARD
router.delete('/delete/:cardId', async (req, res) => {
  console.log('CARD DELETED');
  await Card.findByIdAndDelete(req.param.cardId);
  res.json({ message: 'Successfully deleted' });
});

module.exports = router;
