class Logger {
  log(...msg) {
    console.log(...msg);
  }
  info(...msg) {
    console.info(...msg);
  }
  warn(...msg) {
    console.warn(...msg);
  }
  error(...msg) {
    console.error(...msg);
  }
}

module.exports = Logger;
