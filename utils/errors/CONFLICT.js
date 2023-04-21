class CONFLICT extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 409;
  }
}

module.exports = CONFLICT;
