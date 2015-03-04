'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	User = mongoose.model('User'),
	JsonReturn = require('../models/jsonreturn.server.model');


/**
 * Show the current Login
 */
exports.login = function(req, res) {
	var ret = new JsonReturn();


/*
	console.log(req.body.username);
	User.findUniqueByUsernameAndPassword(req.body.username, req.body.password, function (err, user) {

		if (!err) {
			if (user) {
				ret.o = user;
				ret.s = 1;
			} else {
				ret.s = 0;
			}
		} else {
			ret.o = err;
			ret.s = -1;
		}
		res.json(ret);

	});

User.find({username:'henricavalcante'}, function(err, user) {
	retorno.o = user;
	res.json(retorno);
});*/

};
