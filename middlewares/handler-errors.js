const NotFoundError = require('../errors/not-found-error');
const AccessError = require('../errors/access-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports = (err, req, res, next) => {
  const errorForRes = () => {
    switch (err.name) {
      case 'ValidationError':
        return new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`);
      case 'CastError':
        return new BadRequestError(`Ошибка запроса ${err.message}`);
      case 'AccessError':
        return new AccessError('Вы можете удалять только свои карточки');
      case 'EmptyData':
        return new NotFoundError('Элемент с указанным _id не найдена');
      default: return err;
    }
  };

  const { statusCode = 500, message } = errorForRes();

  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? `На сервере произошла ошибка ${err.message}` : message });

  next();
};
