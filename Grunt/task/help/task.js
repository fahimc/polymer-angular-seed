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
  showHelp: function () {
    var tasks = this.taskRunner.config.tasks;
    console.log('\n\nGrunt Tasks Avaialble');
    for (var key in tasks) {
      var path = this.taskRunner.dirname + '/' + tasks[key] + '/' + this.taskRunner.CONFIG_FILE_NAME;
      if (grunt.file.exists(path)) {
        var package = require(path);
        Logger.info('	' + package.name + '			' + package.description);
      }
    }
  },
  register: function () {
    grunt.registerTask('help', this.showHelp.bind(this));
  }
};

module.exports = Task;
