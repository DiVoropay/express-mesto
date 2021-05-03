const path = require('path');
const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const currentUser = { _id: '608d632b93210f24a84242db' };

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: currentUser._id,
  };

  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('/', (req, res) => {
  res.status(404).send(
    { message: `Страница не существует` } )
});

app.listen(PORT, () => {});
