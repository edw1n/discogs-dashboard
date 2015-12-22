require.config({
	paths: {
		underscore: '../vendor/bower_components/underscore/underscore',
		backbone: '../vendor/bower_components/backbone/backbone',
		marionette: '../vendor/bower_components/backbone.marionette/lib/backbone.marionette',
		text: '../vendor/bower_components/text/text',
		jquery: '../vendor/jquery',
		highcharts: '../vendor/bower_components/highcharts/highcharts',
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},
		marionette: {
			exports: 'Backbone.Marionette',
			deps: ['backbone']
		},
		highcharts: {
			exports: 'Highcharts'
		}
	}
});

require([
	'app/app'
], function(App) {

	'use strict';

	// Create application
	var app = new App();

	// Start app!
	app.start();

	window.app = app;
});
