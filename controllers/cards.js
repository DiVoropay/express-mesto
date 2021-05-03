const Card = require('../models/card');

const handlerError = (err, res) => {
  switch (err.name) {
    case 'ValidationError':
      return res.status(400).send(
        { message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` },
      );
    case 'CastError':
      return res.status(400).send(
        { message: `Ошибка запроса ${err.message}` },
      );
    case 'EmptyData':
      return res.status(404).send(
        { message: 'Карточка с указанным _id не найдена' },
      );
    default: return res.status(500).send(
      { message: `На сервере произошла ошибка ${err.message}` },
    );
  }
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => handlerError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => handlerError(err, res));
};

module.exports.removeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove({ _id: cardId })
    .orFail(() => ({ name: 'EmptyData' }))
    .then((card) => res.send(card))
    .catch((err) => handlerError(err, res));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true, runValidators: true },
  )
    .orFail(() => ({ name: 'EmptyData' }))
    .then((card) => res.send(card))
    .catch((err) => handlerError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true, runValidators: true },
  )
    .orFail(() => ({ name: 'EmptyData' }))
    .then((card) => res.send(card))
    .catch((err) => handlerError(err, res));
};
