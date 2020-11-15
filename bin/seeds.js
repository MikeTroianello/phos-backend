require('dotenv').config();

const mongoose = require('mongoose');
const Card = require('../models/Card');

const cardArray = require('./cardArray');

const uri = 'mongodb://localhost/phos'

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

Card.create(cardArray)
  .then((results) => {
    console.log('SUCCESSSSSSS: ', results);
  })
  .catch((err) => {
    console.log('NO GOOD', err);
  });

// module.exports =
