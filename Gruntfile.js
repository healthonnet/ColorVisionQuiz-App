var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT,
  });
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
  };
var path = require('path');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-cordova-ng');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-zip');

  grunt.initConfig({
    connect: {
      options: {
        port: 1881,
        hostname: '127.0.0.1',
        open: false,
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'www'),
            ];
          },
        },
      },
    },
    watch: {
      files: ['www/**/*.*'],
      options: {
        livereload: LIVERELOAD_PORT,
      },
      tasks: ['lint'],
    },
    jshint: {
      all: ['www/scripts/**/*.js', 'spec/**/*.js'],
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish'),
      },
    },
    jscs: {
      src: ['www/scripts/**/*.js', 'Gruntfile.js', 'spec/**/*.js'],
      options: {
        config: '.jscrc',
      },
    },
    csslint: {
      src: ['www/css/**/*.css'],
    },
    curl: {
      './locales.zip': 'https://localise.biz:443/' +
      'api/export/archive/json.zip?' +
      'key=14f36db4b9da62bb55932a533332b491&' +
      'path=locale-%7B%25lang%7D.json',
    },
    unzip: {
      'using-router': {
        router: function(filepath) {
          var filename = path.basename(filepath);
          return 'locales/' + filename;
        },

        src: './locales.zip',
        dest: './www/',
      },
    },
  });
  grunt.registerTask('default', ['connect', 'lang', 'test', 'watch']);
  grunt.registerTask('lint',    ['jshint', 'jscs', 'csslint']);
  grunt.registerTask('lang',    ['curl', 'unzip']);
  grunt.registerTask('test',    ['lint']);
  grunt.registerTask('build',   ['lang', 'test', 'cordova:package']);

};
