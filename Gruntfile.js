module.exports = function(grunt) {

	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			target: {
				options: {
					keepSpecialComments: 0
				},
				files: [{
					expand: true,
					cwd: './css',
					src: ['*.css'],
					dest: './css',
					ext: '.css'
				}]
			}
		},
		jshint: {
			files: {
				src: [
					'./js/source/**/*.js'
				]
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: './js/source',
					mainConfigFile: './js/source/main.js',
					name: 'main',
					findNestedDependencies: true,
					optimize: 'none',
					preserveLicenseComments: false,
					out: './js/build/main.js',
					paths: {
						'jquery': 'empty:',
						'highcharts': 'empty:'
					}
				}
			}
		},
		sass: {
			files: {
				expand: true,
				cwd: './css/scss',
				src: ['**/*.scss'],
				dest: './css',
				ext: '.css'
			}
		},
		sasslint: {
			options: {
				configFile: './css/scss/.sass-lint.yml',
				files: {
					ignore: ['./css/scss/vendor/**/*.*']
				}
			},
			target: ['./css/scss/**/*.scss']
		},
		watch: {
			js: {
				files:  './js/source/**/*.*',
				tasks: ['requirejs', 'jshint'],
				options: {
					livereload: true,
					spawn: false
				}
			},
			css: {
				files: './css/scss/**/*.scss',
				tasks: ['sass', 'sasslint', 'cssmin'],
				options: {
					livereload: true,
					spawn: false
				}
			}
		}
	});

	// Load installed tasks from packsage.json
	require('load-grunt-tasks')(grunt);

	// Display the elapsed execution time of grunt tasks
	require('time-grunt')(grunt);

	// Default task
	grunt.registerTask('default', ['requirejs', 'sass', 'cssmin']);
};
