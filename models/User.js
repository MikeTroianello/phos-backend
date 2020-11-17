const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  lowerCaseUsername: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  collections: [{type: Schema.Types.ObjectId, ref: 'Collection' }],
  importantCards:[{type: Schema.Types.ObjectId, ref: 'Card' }],
  dislikes: {
    type: Array,
  },
  likesFromOtherUsers:{
    type: Number,
    default: 0
  },
  followers: [{type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{type: Schema.Types.ObjectId, ref: 'User' }],
  collectionsFollowing:[{type: Schema.Types.ObjectId, ref: 'Collection' }],
  deleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  time: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
