const User = require('../models/user');

const handlerError = (err, res) => {
  console.log(res);
    console.log(err.name);
    switch (err.name) {
      case 'ValidationError':
        return res.status(400).send({ message: 'Переданы некорректные данные пользователя'});
      case 'EmptyData':
        return res.status(404).send({ message: 'Пользователь с указанным _id не найден'});
      default: return res.status(500).send({ message: err.message });
      };
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ users }))
    .catch(err => handlerError(err, res));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById({_id: userId})
    .then(data => data ? data : Promise.reject({name: 'EmptyData'}))
    .then(users => res.send( users ))
    .catch(err => handlerError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send( user ))
    .catch(err => handlerError(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {new: true, runValidators: true})
    .then(user => res.send( user ))
    .catch(err => handlerError(err, res));
};

module.exports.updateAvatarUser = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate( req.user._id, { avatar }, {new: true, runValidators: true})
    .then(user => res.send( user ))
    .catch(err => handlerError(err, res));
};