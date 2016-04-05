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
  createView: function () {
    grunt.option('directory', 'App/js/src/view/');
    grunt.option('folder', 'view');
    grunt.task.run('create-module');
  },
  register: function () {
    grunt.registerTask('cv', this.createView.bind(this));
    grunt.registerTask('create-view', this.createView.bind(this));
  }
};

module.exports = Task;
