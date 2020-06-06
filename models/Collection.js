const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  name: {
    type: String,
  },
  // cards: {
  //   type: Array,
  // },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  tags: {
    type: Array,
  },
  public: {
    type: Boolean,
    default: false,
  },
  creatorID: { type: Schema.Types.ObjectId, ref: 'User' },
  timeStamp: { type: Date, default: Date.now },
});

const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;
