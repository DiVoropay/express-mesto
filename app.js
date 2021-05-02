const path = require('path');
const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const currentUser = { _id: "608d632b93210f24a84242db" } //решение до следующего спринта

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use((req, res, next) => {
  req.user = {
    _id: currentUser._id
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);

  app.get('/', (req, res) => {
    res.send(
      `<html>
            <body>
                <p>Ответ на сигнал</p>
            </body>
            </html>`
    );
  });
})