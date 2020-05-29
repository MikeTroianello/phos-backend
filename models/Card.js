const mongoose = require('mongoose');
const Schema = mongoose.schema;

const cardSchema = new Schema({
  type: {
    type: String,
    required: True,
  },
  title: {
    type: String,
    required: True,
  },
  description: {
    type: String,
    required: True,
  },
  example: {
    type: String,
  },
  hashtag: {
    type: ArrayBuffer,
  },
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  favorites: {
    type: Number,
    default: 0,
  },
  timesViewed: {
    type: Number,
    default: 0,
  },
  hideCreator: {
    type: Boolean,
    default: false,
  },
  public: {
    type: Boolean,
    default: false,
  },
  timeStamp: { type: Date, default: Date.now },
});

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
