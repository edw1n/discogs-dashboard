define([
	'underscore',
	'marionette',
	'app/utils/eventbus',
	'app/views/tableItem'
], function(_, Marionette, EventBus, tableItem) {

	'use strict';

	return Marionette.CollectionView.extend({

		tagName: 'ul',

		className: 'releases',

		childView: tableItem,

		initialize: function() {
			this.listenTo(this.collection, 'filter', this.onFilter);
		},

		onFilter: function(data) {
			this.filterData = data;

			this.render();
		},

		filter: function(model) {
			var filterData = this.filterData,
				key,
				data;

			if (!filterData) {
				return;
			}

			// TODO: refactor this!
			if (filterData.key === 'title') {
				data =  this.collection
					.chain()
					.filter(function(model) {
						return model.get('artists')[0].name === filterData.value;
					})
					.uniq(function(model) {
						return model.get('artists')[0].name + model.get('title');
					})
					.map(function(model) {
						return model.get('id');
					})
					.value();

				return _.find(data, function(id) {
					return id === model.get('id');
				});
			}

			key = (model.get(filterData.key)[0] && model.get(filterData.key)[0].name) || model.get(filterData.key);

			return key.toString() === filterData.value;
		}
	});
});
