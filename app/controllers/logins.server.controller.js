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
	//var retorno = new JsonReturn();
	User.findUniqueByUsernameAndPassword('henri', 'cavalcante', function (user) {

		if (user) {
			retorno.o = 'teste';
		}
		res.json(user);

	});

};
