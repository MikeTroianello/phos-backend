require('dotenv').config();

const mongoose = require('mongoose');
const Card = require('../models/Card');
const Collection = require('../models/Collection');

// const cardArray = require('./cardArray');
const mockArray = require('./mockArray');

const uri = 'mongodb://localhost/phos';

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

// console.log('THE CARD ARRAY', mockArray);

// Collection.create({ name: 'testArr', creatorId: '5fb23b04ef57ee4cecc7db6d' })
//   .then((results) => {
//     console.log(results);
//   })
//   .catch((err) => {
//     console.log('NO GOOD', err);
//   });

// async function doIt(mockArray) {
//   try {
//     let results = await Card.insertMany(mockArray);
//     console.log('SUCCESSSSSSS: ', results);
//     let collection = await Collection.findOne({ name: 'testArr' });
//     collection.cards.push(results[0]._id);
//     console.log('THE FINAL COLLECTION', collection);
//     await collection.save();
//     blah();
//   } catch (err) {
//     console.log(err);
//   }
// }

// doIt(mockArray);

// async function blah() {
//   let collection = await Collection.findOne({ name: 'testArr' });
//   console.log('CO', collection);
//   console.log('COLLECTION', collection.cards[0]);
//   let card = await Card.findById(collection.cards[0]);
//   console.log('WTF', card);
// }
console.clear();
let another = async () => {
  try {
    let results = await Card.insertMany(mockArray);
    let arr = [];
    for (let i = 0; i < results.length; i++) {
      arr.push(results[i]._id);
    }
    console.log('T+ARRRRR', arr);
    let collection = await Collection.findOne({ name: 'testArr' });
    collection.cards = [...collection.cards, ...arr];
    console.log('THE COLLECTION', collection);
    collection.save();
  } catch (err) {
    console.log(err);
  }
};

another();
// module.exports =

// Card.create(mockArray)
//   .then((results) => {
//     console.log('SUCCESSSSSSS: ', results);
//   })
//   .catch((err) => {
//     console.log('NO GOOD', err);
//   });
