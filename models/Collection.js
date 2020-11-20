const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // cards: {
  //   type: Array,
  // },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  tags: {
    type: Array,
  },
  private: {
    type: Boolean,
    default: false,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  timeStamp: { type: Date, default: Date.now },
});

const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;
