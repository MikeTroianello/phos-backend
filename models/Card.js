const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  definition: {
    type: Boolean,
    default: true,
  },
  frontside: {
    type: String,
    required: true,
  },
  backside: {
    type: String,
    required: true,
  },
  example: {
    type: String,
  },
  reference: {
    type: String,
  },
  tags: {
    type: Array,
  },
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  important: {
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
