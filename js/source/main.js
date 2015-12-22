require.config({
	paths: {
		underscore: '../../node_modules/underscore/underscore',
		backbone: '../../node_modules/backbone/backbone',
		marionette: '../../node_modules/backbone.marionette/lib/backbone.marionette',
		text: '../../node_modules/requirejs-text/text',
		jquery: '../../node_modules/jquery/dist/jquery',
		highcharts: '../../node_modules/highcharts/highcharts',
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
