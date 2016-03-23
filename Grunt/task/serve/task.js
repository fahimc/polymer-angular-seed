require('shelljs/global');
var grunt;
var taskRunner;
var Task = {
  init: function (_grunt, _taskRunner) {
    grunt = _grunt;
    taskRunner = _taskRunner;
  },
  getConfig: function () {

  },
  startServer: function () {
    cd(__dirname);
    exec('node Server.js -project=' + taskRunner.dirname);
  },
  register: function () {
    grunt.registerTask('serve', this.startServer.bind(this));
  }
};

module.exports = Task;
