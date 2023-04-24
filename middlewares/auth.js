const jwt = require('jsonwebtoken');
const UNAUTHORIZED = require('../utils/errors/UNAUTHORIZED');

module.exports = (req, res, next) => {
  let payload;
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(new UNAUTHORIZED('need authorization'));
    }
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new UNAUTHORIZED('need authorization'));
  }
  req.user = payload;
  return next();
};
