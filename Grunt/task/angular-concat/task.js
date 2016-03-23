require('shelljs/global');
var grunt;
var taskRunner;
var Task = {
  init: function (_grunt, _taskRunner) {
    grunt = _grunt;
    taskRunner = _taskRunner;
  },
  getConfig: function () {
    return {
      clean: {
        angularSrc: {
          src: ["App/js/libs/libs.js", "App/js/src/app.js"]
        }
      },
      concat: {
        options: {
          separator: ';',
          stripBanners: 'line'
        },
        angularLibs: {
          src: ['bower_components/angular/angular.js', '!App/js/libs/libs.js', 'App/js/libs/**','bower_components/webcomponentsjs/webcomponents.min.js'],
          dest: 'App/js/libs/libs.js'
        },
        angularSrc: {
          src: ['App/js/src/main.js','App/js/src/module/*/*.js','!App/js/components.js', '!App/js/polymer/*.js', 'App/js/src/module/**/*.js',  'App/js/template.js'],
          dest: 'App/js/app.js'
        },
        angularMainSrc: {
          src: ['App/js/src/main.js'],
          dest: 'App/js/app.js'
        }
      }
    }
  },
  register: function () {
    grunt.registerTask('angular-concat', ['clean:angularSrc','concat:angularLibs','concat:angularSrc']);
  }
};

module.exports = Task;
