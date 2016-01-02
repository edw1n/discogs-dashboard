define([
	'underscore',
	'backbone',
	'app/utils/eventbus',
	'app/collections/base/releases',
	'app/models/release'
], function(_, Backbone, EventBus, ReleasesCollection, ReleaseModel) {

	'use strict';

	return ReleasesCollection.extend({

		url: 'https://api.discogs.com/users/edw1n/collection/folders/0/releases?per_page=100&sort=added&token=LRocJAFMEXOZVaHnOaNpeJvfcQekKoWDfbQYjDWk',

		initialize: function() {
			var data = JSON.parse(localStorage.getItem('collection'));

			ReleasesCollection.prototype.initialize.call(this, data);
		},

		parse: function(response) {
			// Array from localStorage
			if (!response.pagination) {
				return response;
			}

			// Set total pages if not yet set
			if (!this.totalPages) {
				this.totalPages = response.pagination.pages;
			}

			return response.releases;
		},

		onSync: function(data) {
			if (this.currentPage === this.totalPages) {
				// Save data in localStorage
				localStorage.setItem('collection', JSON.stringify(this.toJSON()));

				// Trigger custom syncAll event when all data is synced
				EventBus.trigger('collection:syncAll', this);
			} else {
				// Update the current page
				++this.currentPage;

				// Fetch data for current page
				this.fetchData(this.currentPage);
			}
		}
	});
});
