'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Login = mongoose.model('Login'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, login;

/**
 * Login routes tests
 */
describe('Login CRUD tests', function() {
	beforeEach(function(done) {
		
	});


	afterEach(function(done) {
		
	});
});