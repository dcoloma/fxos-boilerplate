'use strict';

module.exports = function(grunt) {
  [
    'grunt-contrib-clean',
    'grunt-contrib-connect',
    'grunt-contrib-copy',
    'grunt-gitinfo'
  ].forEach(grunt.loadNpmTasks);

  grunt.loadTasks('tasks');

  grunt.initConfig({

    clean: {
      app: [
        'application.zip',
        'build'
      ]
    },

    copy: {
      build: {
          expand: true,
          cwd: 'app',
          src: ['**'],
          dest: 'build'
      }
    },

    'gitinfo': {
      options: {
        cwd: '.'
      }
    },

    ffospush: {
      app: {
        appId: '<%= grunt.config.get("origin") %>',
        localPort: 'tcp:6000',
        appPath: 'build'
      }
    },

    ffosstop: {
      app: {
        appId: '<%= grunt.config.get("origin") %>',
        localPort: 'tcp:6000'
      }
    },

    ffoslaunch: {
      app: {
        appId: '<%= grunt.config.get("origin") %>',
        localPort: 'tcp:6000'
      }
    }
  });

  grunt.registerTask('install', 'Build app for dev', [
    'build',
    'ffosstop:app',
    'ffospush:app',
    'ffoslaunch:app'
  ]);

  grunt.registerTask('build', 'Build app for release', [
    'clean',
    'copy:build',
    'configure',
  ]);

  grunt.registerTask('default', ['build']);
};
