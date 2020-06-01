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

//ADD TO COLLECTION
router.patch('/add/:collectionId/:cardId', async (req, res) => {
  let collection = await Collection.findOne({ _id: req.params.collectionId });
  console.log('this is the collection', collection);
  collection.cards.push(req.params.cardId);
  console.log('THIS IS THE COLLECTION NOW', collection);
  await collection.save();
  console.log('ADDED NEW CARD', collection);
  res.json(collection);
});

module.exports = router;
