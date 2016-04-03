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
  startServer: function () {
    cd(this.taskRunner.dirname);
    exec('node Server/Server.js -environment=development');
  },
  register: function () {
    grunt.registerTask('dev-server', this.startServer.bind(this));
  }
};

module.exports = Task;
