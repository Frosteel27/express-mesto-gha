module.exports = (err, req, res, next) => {
  const { errorCode = 500, message } = err;
  res.status(errorCode).send({ message: errorCode === 500 ? 'server error' : message });
  next();
};
