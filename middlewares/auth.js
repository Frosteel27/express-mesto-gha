const jwt = require('jsonwebtoken');
const UNAUTHORIZED = require('../utils/errors/UNAUTHORIZED');

module.exports = (req, res, next) => {
  let payload;
  try {
    const { token } = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(new UNAUTHORIZED('need authorization here'));
    }
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new UNAUTHORIZED('need authorization there'));
  }
  req.user = payload;
  return next();
};
