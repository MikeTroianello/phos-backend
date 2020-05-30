const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  collections: {
    type: Array,
  },
  important: {
    type: Array,
  },
  dislikes: {
    type: Array,
  },
  followers: {
    type: Array,
  },
  following: {
    type: Array,
  },
  deleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  time: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
