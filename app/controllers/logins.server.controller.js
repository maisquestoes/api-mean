'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	User = mongoose.model('User'),
	JsonReturn = require('../models/jsonreturn.server.model'),
	_ = require('lodash');


/**
 * Show the current Login
 */
exports.login = function(req, res) {
	var retorno = JsonReturn();

	User.find({username: 'henri'}, function (err, user) {
		
		if (err) {
			res.jsonp();
			
		}
		else {
			retorno.o = user;
			res.jsonp(retorno);
			

		}
	});
	
};
