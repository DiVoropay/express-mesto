const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, '{VALUE} - короче минимальной длины в 2 символа'],
    maxlength: [30, '{VALUE} - длинее максимальной длины в 30 символов'],
    required: [true, 'Поле НАЗВАНИЕ должно быть заполнено'],
  },
  link: {
    type: String,
    required: [true, 'Поле ССЫЛКА должно быть заполнено'],
    validate: {
      validator: (v) => /^http[s]?:\/\/[www.]*[\w-._~:/?#[\]@!$&'()*+,;=]+/.test(v),
      message: 'Неправильный формат ссылки {VALUE}',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Пользователь не определен'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
