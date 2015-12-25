define([
	'underscore',
	'backbone',
	'app/utils/eventbus',
	'text!app/templates/loadMask.html'
], function(_, Backbone, EventBus, LoadMaskTpl) {

	'use strict';

	return Backbone.View.extend({

		template: _.template(LoadMaskTpl),

		initialize: function() {
			this.listenTo(this.collection, 'request', this.show);
			this.listenTo(EventBus, 'collection:syncAll wantlist:syncAll', this.hide);

			// Create loading mask
			this.createMask();
		},

		createMask: function() {
			this.el.innerHTML += this.template();

			this.mask = this.el.querySelector('.load-mask');
		},

		show: function() {
			this.mask.style.display = 'block';
		},

		hide: function() {
			this.mask.style.display = 'none';
		}

	});
});
