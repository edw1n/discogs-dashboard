define([
	'underscore',
	'backbone'
], function(_, Backbone) {

	'use strict';

	return Backbone.Model.extend({

		defaults: {
			'title': null,
			'year': null,
			'thumb': null,
			'formats': [],
			'labels': [],
			'artists': []
		},

		validate: function(attr, options) {
			if (!attr.title) {
				return 'invalid model';
			}
		},

		initialize: function() {
		},

		parse: function(response) {
			if (response.basic_information) {
				return response.basic_information;
			}

			return response;
		}
	});
});
