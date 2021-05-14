const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'develop-secret';

const CredentialsError = require('../errors/credentials-error');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new CredentialsError('Необходима авторизация');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    throw new CredentialsError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
