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
			var key;
			if (!this.filterData) {
				return;
			}

			key = (model.get(this.filterData.key)[0] && model.get(this.filterData.key)[0].name) || model.get(this.filterData.key);

			return key.toString() === this.filterData.value;
		}
	});
});