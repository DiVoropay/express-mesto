const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'director',
  }
});

module.exports = mongoose.model('user', userSchema);
