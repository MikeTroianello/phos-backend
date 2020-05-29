const mongoose = require('mongoose');
const Schema = mongoose.schema;

const collectionSchema = new Schema({
  name: {
    type: String,
  },
  collection: {
    type: Array,
  },
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
