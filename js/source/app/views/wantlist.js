define([
	'underscore',
	'marionette',
	'app/utils/eventbus',
	'app/collections/wantlist',
	'app/views/chart',
	'text!app/templates/wantlist.html'
], function(_, Marionette, EventBus, WantlistCollection, ChartView, wantlistTpl) {

	'use strict';

	return Marionette.LayoutView.extend({

		template: _.template(wantlistTpl),

		collection: new WantlistCollection(),

		regions: {
			artistsChart: '.chart--artists',
			formatsChart: '.chart--formats',
			yearChart: '.chart--year'
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

			if (this.collection.length) {
				EventBus.trigger('wantlist:syncAll', this.collection);
			}
		}
	});
});