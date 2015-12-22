define([
	'marionette',
	'app/views/overview',
	'app/views/collection',
	'app/views/wantlist',
	'text!app/templates/dashboard.html'
], function(Marionette, OverviewView, CollectionView, WantlistView, dashboardTpl) {

	'use strict';

	return Marionette.LayoutView.extend({

		el: '.container',

		template: _.template(dashboardTpl),

		regions: {
			myOverview: '#overview',
			myCollection: '#collection',
			myWantlist: '#wantlist'
		},

		initialize: function() {
			this.render();
		},

		onRender: function() {
			this.myOverview.show(new OverviewView());
			this.myCollection.show(new CollectionView());
			this.myWantlist.show(new WantlistView());
		}
	});
});