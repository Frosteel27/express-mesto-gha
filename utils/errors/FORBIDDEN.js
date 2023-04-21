class FORBIDDEN extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 403;
  }
}

module.exports = FORBIDDEN;
