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
     concurrent: {
      dev: {
        tasks:  ['angular-watch', 'dev-server']
      },
      options: {
        logConcurrentOutput: true
      }
    }
  }
},
register: function () {
  grunt.registerTask('dev', ['polymer-vulcanize','angular-templates','angular-concat','concurrent']);
}
};

module.exports = Task;
