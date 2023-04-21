class BAD_REQUEST extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 400;
  }
}

module.exports = BAD_REQUEST;
