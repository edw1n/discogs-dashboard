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

		events: {
			'click button': 'onButtonClick'
		},

		regions: {
			artistsChart: '.artists-chart',
			formatsChart: '.formats-chart',
			yearChart: '.year-chart',
			collectionTable: '.collection-table'
		},

		onButtonClick: function() {
			this.collection.add({
				title: 'Test',
				artists: [{
					name: 'Test'
				}],
				formats: [{
					descriptions: ['Vinyl']
				}],
				year: 2014
			});
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