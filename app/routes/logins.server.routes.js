'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var logins = require('../../app/controllers/logins.server.controller');

	// Logins Routes
	app.route('/logins')
		.get(logins.list)
		.post(users.requiresLogin, logins.create);

	app.route('/logins/:loginId')
		.get(logins.read)
		.put(users.requiresLogin, logins.hasAuthorization, logins.update)
		.delete(users.requiresLogin, logins.hasAuthorization, logins.delete);

	// Finish by binding the Login middleware
	app.param('loginId', logins.loginByID);
};
