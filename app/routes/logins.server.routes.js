'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var logins = require('../../app/controllers/logins.server.controller');

	// Logins Routes
	app.route('/api/login/')
		.post(logins.login);

};
