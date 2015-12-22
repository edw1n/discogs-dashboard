module.exports = function(grunt) {

	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
		watch: {
			js: {
				files:  './js/source/**/*.js',
				tasks: ['requirejs'],
				options:  {
					livereload: true,
					spawn: false
				}
			},
			sass: {
				files: './css/scss/**/*.scss',
				tasks: ['sass'],
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
	grunt.registerTask('default', ['requirejs', 'sass']);
};