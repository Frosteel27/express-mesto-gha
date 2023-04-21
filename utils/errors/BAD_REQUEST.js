class BAD_REQUEST extends Error {
  constructor(msg) {
    super(msg);
    this.errorCode = 400;
  }
}

module.exports = BAD_REQUEST;
