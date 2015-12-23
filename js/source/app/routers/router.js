define([
	'backbone',
	'marionette'
], function(Backbone, Marionette) {

	'use strict';

	return Marionette.AppRouter.extend({

		views: {},

		routes : {
			'' : 'dashboard'
		},

		dashboard: function() {
			require(['app/views/dashboard'], _.bind(function(DashboardView) {
				this.views.dashboard = new DashboardView();
			}, this));
		}
	});
});
