define([
	'underscore',
	'marionette',
	'highcharts',
	'app/utils/eventbus',
	'app/models/chart',
	'text!app/templates/chart.html'
], function(_, Marionette, Highcharts, EventBus, ChartModel, ChartTpl) {

	'use strict';

	return Marionette.ItemView.extend({

		template: _.template(ChartTpl),

		initialize: function() {
			this.model = new ChartModel();
		},

		onRender: function() {
			this.listenTo(EventBus, 'collection:syncAll wantlist:syncAll', this.onSyncAll);
		},

		onSyncAll: function(collection) {
			var collection = collection === this.collection,
				data;

			if (collection) {
				data = this.collection.filterData(this.options.key);

				// Only render chart when not rendered yet, or when data is updated
				if (!_.isEqual(data, this.model.get('data'))) {
					this.model.set('data', data);

					this.renderChart();
				}
			}
		},

		getChartColors: function() {
			var colors = [],
				base = '#9386ff',
				i;

			for (i = 0; i < 10; i++) {
				// Start out with a darkened base color (negative brighten), and end up with a much brighter color
				colors.push(Highcharts.Color(base).brighten((i - 6) / 15).get());
			}

			return colors;
		},

		renderChart: function() {
			var chartContainer = this.el.querySelector('.chart-container'),
				chartType = this.options.type,
				chartTitle = this.options.key,
				chartData = this.model.get('data'),
				colors = this.getChartColors(),
				collection = this.collection;

			this.chart = new Highcharts.Chart({
				chart: {
					renderTo: chartContainer,
					type: chartType,
					backgroundColor: null
				},
				credits: {
					enabled: false
				},
				title: {
					text: null
				},
				legend: {
					enabled: false
				},
				//colors: colors,
				plotOptions: {
					series: {
						borderWidth: 0,
						name: chartTitle
					},
					pie: {
						allowPointSelect: true,
						dataLabels: {
							enabled: false
						},
						innerSize: '60%',
						point: {
							events: {
								click: function() {
									var data = {
										'key': this.series.name,
										'value': this.name
									};

									collection.trigger('filter', data);
								}
							}
						}
					}
				},
				tooltip: {
					formatter: function() {
						return '<strong>' + this.key + '</strong>' + ': ' + this.y;
					},
					borderColor: 'none'
				},
				xAxis: {
					title: {
						text: chartTitle.charAt(0).toUpperCase() + chartTitle.slice(1)
					}
				},
				yAxis: {
					title: {
						text: null
					}
				},
				series: [{
					data: chartData
				}]
			});
		}
	});
});