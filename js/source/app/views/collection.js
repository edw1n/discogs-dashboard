define([
	'underscore',
	'marionette',
	'app/utils/eventbus',
	'app/collections/collection',
	'app/views/chart',
	'app/views/table',
	'text!app/templates/collection.html'
], function(_, Marionette, EventBus, CollectionCollection, ChartView, CollectionTableView, collectionTpl) {

	'use strict';

	return Marionette.LayoutView.extend({

		template: _.template(collectionTpl),

		collection: new CollectionCollection(),

		regions: {
			artistsChart: '.chart--artists',
			formatsChart: '.chart--formats',
			yearChart: '.chart--year',
			collectionTable: '.collection-table'
		},

		onRender: function() {
			this.artistsChart.show(new ChartView({
				'collection': this.collection,
				'type': 'pie',
				'key': 'artists'
			}));

			this.formatsChart.show(new ChartView({
				'collection': this.collection,
				'type': 'column',
				'key': 'formats'
			}));

			this.yearChart.show(new ChartView({
				'collection': this.collection,
				'type': 'pie',
				'key': 'year'
			}));

			this.collectionTable.show(new CollectionTableView({
				'collection': this.collection
			}));

			if (this.collection.length) {
				EventBus.trigger('collection:syncAll', this.collection);
			}
		}
	});
});