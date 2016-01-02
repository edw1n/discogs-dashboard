module.exports = function(grunt) {

	'use strict';

	var paths = {
		css: './css',
		js: './js'
	};

	grunt.initConfig({
		paths: paths,
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			target: {
				options: {
					keepSpecialComments: 0
				},
				files: [{
					expand: true,
					cwd: '<%= paths.css %>',
					src: ['*.css'],
					dest: '<%= paths.css %>',
					ext: '.css'
				}]
			}
		},
		jscs: {
			src: ['<%= paths.js %>/source/**/*.js'],
			options: {
				config: '<%= paths.js %>/.jscsrc',
				fix: true
			}
		},
		jshint: {
			files: {
				src: ['<%= paths.js %>/source/**/*.js']
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: '<%= paths.js %>/source',
					mainConfigFile: '<%= paths.js %>/source/main.js',
					name: 'main',
					findNestedDependencies: true,
					optimize: 'none',
					preserveLicenseComments: false,
					out: '<%= paths.js %>/build/main.js',
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
				cwd: '<%= paths.css %>/scss',
				src: ['**/*.scss'],
				dest: '<%= paths.css %>',
				ext: '.css'
			}
		},
		sasslint: {
			options: {
				configFile: '<%= paths.css %>/scss/.sass-lint.yml',
				files: {
					ignore: ['<%= paths.css %>/scss/vendor/**/*.*']
				}
			},
			target: ['<%= paths.css %>/scss/**/*.scss']
		},
		watch: {
			js: {
				files:  '<%= paths.js %>/source/**/*.*',
				tasks: ['requirejs', 'jshint', 'jscs'],
				options: {
					livereload: true,
					spawn: false
				}
			},
			css: {
				files: '<%= paths.css %>/scss/**/*.scss',
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
