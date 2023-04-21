class NOT_FOUND extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 404;
  }
}

module.exports = NOT_FOUND;
