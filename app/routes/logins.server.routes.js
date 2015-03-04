'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller'),
		logins = require('../../app/controllers/logins.server.controller'),
		passport = require('passport');

	// Logins Routes
	app.route('/api/login/')
		.post(logins.login);

	app.route('/api/test')
		.post(users.requiresApikey,
		function(req, res) {
	    res.json({ message: 'Authenticated' });
	  });

};
