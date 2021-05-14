const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-error');
const AccessError = require('../errors/access-error');
const BadRequestError = require('../errors/bad-request-error');

const handlerError = (err) => {
  switch (err.name) {
    case 'ValidationError':
      return new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`);
    case 'CastError':
      return new BadRequestError(`Ошибка запроса ${err.message}`);
    case 'AccessError':
      return new AccessError('Вы можете удалять только свои карточки');
    case 'EmptyData':
      return new NotFoundError('Карточка с указанным _id не найдена');
    default: return err;
  }
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(handlerError(err)));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => next(handlerError(err)));
};

module.exports.removeCard = (req, res, next) => {
  const { cardId } = req.params;
  const currentUser = req.user._id;

  Card.findById({ _id: cardId })
    .orFail(() => ({ name: 'EmptyData' }))
    .then((card) => {
      const { owner } = card;
      if (`${owner}` !== `${currentUser}`) {
        throw handlerError({ name: 'AccessError' });
      }
      Card.findByIdAndRemove({ _id: cardId })
        .then((removedCard) => res.send(removedCard))
        .catch((err) => next(handlerError(err)));
    })
    .catch((err) => next(handlerError(err)));
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true, runValidators: true },
  )
    .orFail(() => ({ name: 'EmptyData' }))
    .then((card) => res.send(card))
    .catch((err) => next(handlerError(err)));
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true, runValidators: true },
  )
    .orFail(() => ({ name: 'EmptyData' }))
    .then((card) => res.send(card))
    .catch((err) => next(handlerError(err)));
};
