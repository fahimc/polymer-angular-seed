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
      open: {
        all: {
          path: 'http://localhost:<%= connect.all.options.port%>'
        }
      },
      connect: {
        all: {
          options: {
            port: 9000,
            hostname: "localhost",
            livereload: true
          }
        }
      },
      less: {
        development: {
          options: {
            paths: ["App/js/src/module", "App/style"]
          },
          files: {
            "App/style/style.css": "App/style/main.less"
          }
        }
      },
      watch: {
        src: {
          files: ['App/js/src/main.js', 'App/js/src/module/**/**'],
          options: {
            livereload: true
          },
          tasks: ['angular-concat']
        },
        html: {
          files: ['App/*.html'],
          options: {
            livereload: true
          }
        },
        templates: {
          files: 'App/js/src/module/**/template/*.html',
          tasks: ['angular-templates', 'angular-concat'],
          options: {
            livereload: true,
          }
        },
        less: {
          files: 'App/style/**/*.less',
          tasks: ['less'],
          options: {
            interrupt: false,
            livereload: true,
          }
        },
        lessModules: {
          files: 'App/js/src/module/**/*.less',
          tasks: ['less', 'copy:css'],
          options: {
            interrupt: false,
            livereload: true,
          }
        },
      }
    }
  },
  register: function () {
    grunt.registerTask('angular-watch', ['open:all', 'connect:all', 'watch']);
  }
};

module.exports = Task;
