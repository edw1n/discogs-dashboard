define([
	'backbone',
	'marionette'
], function(Backbone, Marionette) {

	'use strict';

	return Marionette.AppRouter.extend({
		routes : {
			'' : 'dashboard'
		},

		dashboard: function() {
			require(['app/views/dashboard'], function(DashboardView) {
				app.views.dashboard = new DashboardView();
			});
		}
	});
});