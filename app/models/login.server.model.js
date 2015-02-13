'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Login Schema
 */
var LoginSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Login name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Login', LoginSchema);