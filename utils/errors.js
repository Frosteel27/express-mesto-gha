const errors = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const handleError = (res, err) => {
  switch (err.name) {
    case 'CastError':
      res.status(errors.NOT_FOUND).send({ message: 'Entity not found' });
      break;
    case 'ValidationError':
      res.status(errors.BAD_REQUEST).send({ message: 'Bad request' });
      break;
    default:
      res.status(errors.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong' });
      break;
  }
};

module.exports = handleError;
