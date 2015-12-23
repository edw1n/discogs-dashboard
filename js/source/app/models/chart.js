define([
	'underscore',
	'backbone',
], function(_, Backbone) {

	'use strict';

	return Backbone.Model.extend({

		defaults: {
			'type': 'line',
			'data': null
		},

		initialize: function() {
			this.tempData = [];

			this.listenTo(this, 'sync', this.onSync);
		},

		getData: function() {
			var vinylFormats = JSON.parse(localStorage.getItem('vinylFormats'));

			// Return data from localStorage if available
			if (vinylFormats) {
				this.set('data', vinylFormats);

				return;
			}

			// Fetch data
			this.fetchData();
		},

		fetchData: function(page) {
			page = page || 1;

			this.fetch({
				data: {
					'page': page
				}
			});
		},

		onSync: function() {
			var currentPage = this.get('currentPage'),
				totalPages = this.get('totalPages');

			if (currentPage !== totalPages) {
				// Update the current page
				this.set('currentPage', ++currentPage);

				// Fetch data for current page
				this.fetchData(currentPage);
			}
		},

		parse: function(response) {
			var vinylFormats,
				chartData = [],
				totalPages = this.get('totalPages');

			// Set total pages if not set yet
			if (!totalPages) {
				totalPages = response.pagination.pages;

				this.set('totalPages', totalPages);
			}

			// Add data to temmData
			this.tempData = this.tempData.concat(response.releases);

			// After fetching last page, count formats and return data for chart
			if (response.pagination.page === totalPages) {

				// Count the vinyl formats (lp, 12", etc.)
				vinylFormats = _.countBy(this.tempData, function(release) {
					return release.basic_information.formats[0].descriptions[0];
				});

				// Data format for use in chart
				_.each(vinylFormats, function(value, key) {
					chartData.push([
						key, value
					]);
				});

				// Save formats for localStorage
				localStorage.setItem('vinylFormats', JSON.stringify(chartData));

				return {
					'data': chartData
				};
			}
		}
	});
});