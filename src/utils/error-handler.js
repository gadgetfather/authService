class AppErrors extends Error {
  constructor(name, message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
    this.name = name;
  }
}
