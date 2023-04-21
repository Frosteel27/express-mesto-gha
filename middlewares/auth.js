const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let payload;
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error('need authorization');
    }
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    res.status(401).send({ message: 'authorization needed' });
  }
  req.user = payload;
  next();
};
