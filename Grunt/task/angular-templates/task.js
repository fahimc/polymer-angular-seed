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
      ngtemplates: {
        "app": {
          cwd: 'App/js/src/module',
          src: ['**/*.html'],
          dest: 'App/js/template.js',
          options: {
            htmlmin: {
              collapseWhitespace: true,
              collapseBooleanAttributes: true
            }
          }
        }
      }
    }
  },
  register: function () {
    grunt.registerTask('angular-templates', ['ngtemplates']);
  }
};

module.exports = Task;
