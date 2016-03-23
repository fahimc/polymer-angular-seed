var Logger = {
  init: function () {},
  warn: function (message) {
    console.warn('WARNING: ' + message ['yellow']);
  },
  error: function (message) {
    console.error('ERROR: ' + message ['red']);
  },
  ok: function (message) {
    console.log(message ['green']);
  },
  log: function (message) {
    console.log(message);
  },
  info: function (message) {
     console.log(message ['grey']);
  }
}
module.exports = Logger;
