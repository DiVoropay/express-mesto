const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send( cards ))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(card => res.send( card ))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.removeCard = (req, res) => {
  const { cardId } = req.params

  Card.findByIdAndRemove({_id: cardId})
    .then(card => res.send( card ))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params
  const owner = req.user._id;

  Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: owner } },
      { new: true }
    )
    .then(card => res.send( card ))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params
  const owner = req.user._id;

  Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: owner } },
      { new: true }
    )
    .then(card => res.send( card ))
    .catch(err => res.status(500).send({ message: err.message }));
};