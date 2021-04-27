const express = require('express');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)

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