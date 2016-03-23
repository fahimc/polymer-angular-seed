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
      clean: {
        dist: {
          src: ["Dist/"]
        }
      },
      uglify: {
        options: {
          mangle: false
        },
        app: {
          files: {
            'Dist/js/app.js': ['Dist/js/app.js']
          }
        },
        libs: {
          files: {
            'Dist/js/libs/libs.js': ['Dist/js/libs/libs.js']
          }
        }
      },
      copy:{
        distIndex:{
         expand: true,
         cwd: 'App/',
         src:['index.html'],
         dest: 'Dist/'
       },
       distStyle:{
        expand: true,
        cwd: 'App/',
        src:['style/style.css'],
        dest: 'Dist/'
      },
      distLibs:{
        expand: true,
        cwd: 'App/',
        src:['js/libs/libs.js'],
        dest: 'Dist/'
      },
      distSrc:{
        expand: true,
        cwd: 'App/',
        src:['js/app.js','js/template.js','js/components.js','js/components.html'],
        dest: 'Dist/'
      },
      distPolymer:{
        expand: true,
        cwd: 'App/',
        src:['js/component/**'],
        dest: 'Dist/'
      },
      distAppJSON:{
        expand: true,
        src:['app.json'],
        dest: 'Dist/'
      }
    }
  }
},
register: function () {
  grunt.registerTask('dist', ['clean:dist','polymer-vulcanize','angular-concat','copy:distIndex','copy:distStyle','copy:distLibs','copy:distSrc','copy:distPolymer','copy:distAppJSON', 'uglify:app', 'uglify:libs']);
}
};

module.exports = Task;
