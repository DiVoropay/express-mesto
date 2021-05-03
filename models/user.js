const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, '"{VALUE}" короче минимальной длины в 2 символа'],
    maxlength: [30, '"{VALUE}" длинее максимальной длины в 30 символов'],
    required: [true, 'Поле ИМЯ должно быть заполнено'],
  },
  about: {
    type: String,
    minlength: [2, '{VALUE} - короче минимальной длины в 2 символа'],
    maxlength: [30, '{VALUE} - длинее максимальной длины в 30 символов'],
    required: [true, 'Поле О СЕБЕ должно быть заполнено'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле АВАТАР должно быть заполнено'],
  },
});

module.exports = mongoose.model('user', userSchema);
