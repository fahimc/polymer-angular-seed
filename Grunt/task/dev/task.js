var grunt;
var Logger = require('../../module/Logger.js');
var Task = {
  taskRunner: null,
  init: function (_grunt, _taskRunner) {
    grunt = _grunt;
    this.taskRunner = _taskRunner;
  },
  getConfig: function () {
    return {

    }
  },
  register: function () {
    grunt.registerTask('dev', ['polymer-vulcanize','angular-concat','angular-watch']);
  }
};

module.exports = Task;
