define([
	'underscore',
	'marionette',
	'app/utils/eventbus',
	'text!app/templates/overview.html'
], function(_, Marionette, EventBus, overviewTpl) {

	'use strict';

	return Marionette.LayoutView.extend({

		template: _.template(overviewTpl),

		ui: {
			collectionCount: '.js-card-collection',
			wantlistCount: '.js-card-wantlist'
		},

		onRender: function() {
			this.listenTo(EventBus, 'collection:syncAll', this.setCollectionCount);
			this.listenTo(EventBus, 'wantlist:syncAll', this.setWantlistCount);

		},

		setCollectionCount: function(collection) {
			if (collection.length) {
				this.ui.collectionCount[0].textContent = collection.length;
			}
		},

		setWantlistCount: function(wantlist) {
			wantlist = wantlist.groupByTitle();

			if (wantlist.length) {
				this.ui.wantlistCount[0].textContent = wantlist.length;
			}
		}
	});
});
