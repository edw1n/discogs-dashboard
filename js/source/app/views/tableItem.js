define([
	'underscore',
	'marionette',
	'app/utils/eventbus',
	'text!app/templates/tableItem.html',
], function(_, Marionette, EventBus, tableItemTpl) {

	'use strict';

	return Marionette.ItemView.extend({

		tagName: 'li',

		className: 'release',

		template: _.template(tableItemTpl),

		onRender: function() {
		}
	});
});