define([
	'underscore',
	'marionette',
	'app/utils/eventbus',
	'app/collections/wantlist',
	'app/views/chart',
	'app/views/table',
	'text!app/templates/wantlist.html'
], function(_, Marionette, EventBus, WantlistCollection, ChartView, TableView, wantlistTpl) {

	'use strict';

	return Marionette.LayoutView.extend({

		template: _.template(wantlistTpl),

		collection: new WantlistCollection(),

		regions: {
			artistsChart: '.chart--artists',
			formatsChart: '.chart--formats',
			yearChart: '.chart--year',
			wantlistTable: '.table--wantlist'
		},

		onRender: function() {
			this.artistsChart.show(new ChartView({
				'collection': this.collection,
				'type': 'pie',
				'key': 'title'
			}));

			this.yearChart.show(new ChartView({
				'collection': this.collection,
				'type': 'pie',
				'key': 'year'
			}));

			this.wantlistTable.show(new TableView({
				'collection': this.collection
			}));

			if (this.collection.length) {
				EventBus.trigger('wantlist:syncAll', this.collection);
			}
		}
	});
});
