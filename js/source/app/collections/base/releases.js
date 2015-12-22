define([
	'underscore',
	'backbone',
	'app/utils/eventbus',
	'app/models/release'
], function(_, Backbone, EventBus, ReleaseModel) {

	'use strict';

	return Backbone.Collection.extend({

		model: ReleaseModel,

		initialize: function(data) {
			this.listenTo(this, 'sync', this.onSync);

			// Return collection data from localStorage if available
			if (data) {
				this.setDataFromLocalStorage(data);
				this.pollData();

				return;
			}

			// Fetch data from API
			this.fetchData();

			this.currentPage = 1;
		},

		pollData: function() {
			this.currentPage = Math.ceil(this.length / 100);

			setInterval(_.bind(this.fetchData, this, this.currentPage), 20000);
		},

		setDataFromLocalStorage: function(data) {
			this.reset(data, { parse: true });
		},

		fetchData: function(page) {
			page = page || 1;

			this.fetch({
				remove: false,
				validate: true,
				data: {
					'page': page
				}
			});
		},

		filterData: function(key) {
			if (key === 'formats') {
				return this.countByFormat();

			} else if (key === 'title') {
				return this.groupByTitle(10);

			} else {
				return this.countByKey(key);
			}
		},

		countByFormat: function() {
			return this
				.chain()
				.countBy(function(model) {;
					return model.get('formats')[0].descriptions[0];
				})
				.pairs()
				.sortBy(1)
				.reverse()
				.slice(0, 4)
				.value();

		},

		countByKey: function(key) {
			return this
				.chain()
				.countBy(function(model) {
					return (model.get(key)[0] && model.get(key)[0].name) || model.get(key);
				})
				.pairs()
				.sortBy(1)
				.reverse()
				.slice(0, 10)
				.value();
		},

		groupByTitle: function(num) {
			return this
				.chain()
				.uniq(function(model) {
					return model.get('artists')[0].name + model.get('title');
				})
				.countBy(function(model) {
					return model.get('artists')[0].name;
				})
				.pairs()
				.sortBy(1)
				.reverse()
				.slice(0, num)
				.value();
		}
	});
});