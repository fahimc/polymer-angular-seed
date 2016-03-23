var grunt;
var Logger = require('../../module/Logger.js');
var path = require('path');
var Task = {
  taskRunner: null,
  init: function (_grunt, _taskRunner) {
    grunt = _grunt;
    this.taskRunner = _taskRunner;
    console.log( path.join(Task.taskRunner.dirname,'Grunt/task/lint/resource/.eslintrc'));
  },
  getConfig: function () {
    return {
     eslint: {
      options: {
        configFile: path.join(Task.taskRunner.dirname,'Grunt/task/lint/resource/.eslintrc'),
        ignorePath: path.join(Task.taskRunner.dirname,'Grunt/task/lint/resource/.eslintignore'),
        extensions: ['.js', '.html', '.xhtml', '.htm'],
        format: (grunt.option('o') === undefined && grunt.option('output') === undefined) ? 'stylish' : 'html',
        outputFile: (grunt.option('o') === undefined && grunt.option('output') === undefined) ? '' : path.join(Task.taskRunner.dirname, 'Test/report/lint.html')
      },
      one:'./'
    },
  }
},
register: function () {
  grunt.registerTask('lint', ['eslint']);
}
};

module.exports = Task;
