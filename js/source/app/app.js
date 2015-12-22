define([
	'backbone',
	'marionette',
	'app/routers/router'
], function(Backbone, Marionette, Router) {

	'use strict';

	return Marionette.Application.extend({

		initialize: function() {
			// Add our router to the app
			this.router = new Router();

			// Keep track of our views
			this.views = {};

			// Start history when our application is ready
			this.on('start', function() {
				Backbone.history.start();
			});
		}
	});
});