const express = require('express');
const router = express.Router();

const Collection = require('../models/Collection');

//CREATE COLLECTION
router.post('/create', async (req, res) => {
  let { name, tags, public } = req.body;
  if (!public) public = false;
  tags = tags.split(' ');
  const newCollection = new Collection({ name, tags, public });
  const savedCollection = await newCollection.save();
  console.log('collection has been saved');
  res.json(savedCollection);
});

//VIEW COLLECTION
router.get('/:collectionId', (req, res) => {
  Collection.findById(req.params.collectionId).then((a) => {
    console.log('HERE', a);
    res.json(a);
  });
});

//ADD TO COLLECTION
router.patch('/add/:collectionId/:cardId', async (req, res) => {
  let collection = await Collection.findOne({ _id: req.params.collectionId });
  // console.log('this is the collection', collection);
  collection.cards.push(req.params.cardId);
  // console.log('THIS IS THE COLLECTION NOW', collection);
  await collection.save();
  // console.log('ADDED NEW CARD', collection);
  res.json(collection);
});

// router.patch('/add/:collectionId/:cardId', (req, res) => {
//   Collection.findByIdAndUpdate(
//     req.params.collectionId,
//     {
//       $push: { cards: req.params.cardId },
//     },
//     (err, success) => {
//       if (err) {
//         console.log('failed', error);
//       }
//     }
//   ).then((expandedCollection) => {
//     console.log('ADDED NEW CARD', expandedCollection);
//     res.json(expandedCollection);
//   });
// });

// router.patch('/add/:collectionId/:cardId', (req, res) => {
//   Collection.findByIdAndUpdate(req.params.collectionId, {
//     $push: { cards: req.params.cardId },
//   }).then((a) => {
//     console.log('ADDED NEW CARD', a);
//     res.json(a);
//   });
// });

//REMOVE CARDS FROM ARRAY
router.patch('/remove/:collectionId/:cardId', async (req, res) => {
  Collection.findByIdAndUpdate(
    req.params.collectionId,
    {
      $pull: { cards: req.params.cardId },
    },
    (err, success) => {
      if (err) {
        console.log('failed', error);
      }
      // else {
      //   console.log('s', success);
      //   // res.json(success);
      // }
    }
  ).then((a) => {
    console.log(a);
    res.json(a);
  });
});

//DELETE COLLECTION
// router.post('/delete/:collectionId', (req, res) => {
//   console.log(req.params.collectionId);
//   Collection.findByIdAndRemove(req.params.collectionId).then(() => {
//     res.json({ message: 'deleted' });
//   });
// });

router.delete('/delete/:collectionId', (req, res) => {
  console.log(req.params.collectionId);
  Collection.findByIdAndDelete(req.params.collectionId).then(() => {
    res.json({ message: 'deleted' });
  });
});

module.exports = router;
