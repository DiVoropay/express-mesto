const User = require('../models/user');

const answers = {

  create: {
    ValidationError: () => {res.status(400).send(
      { message:
        'Переданы некорректные данные при создании пользователя'
      })}

  }

}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById({_id: userId})
    .then(users => res.send( users ))
    .catch(err => res.status(500).send({ message: err.name }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send( user ))
    .catch(err => {
      if (err.name === 'ValidationError') {
        return res.status(400).send(
          { message:
            'Переданы некорректные данные при создании пользователя'
          }
        );
      } else {
        return res.status(500).send({ message: err.name });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {new: true})
    .then(user => res.send( user ))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.updateAvatarUser = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate( req.user._id, { avatar }, {new: true})
    .then(user => res.send( user ))
    .catch(err => res.status(500).send({ message: err.message }));
};