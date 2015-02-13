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
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Login
		user.save(function() {
			login = {
				name: 'Login Name'
			};

			done();
		});
	});

	it('should be able to save Login instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Login
				agent.post('/logins')
					.send(login)
					.expect(200)
					.end(function(loginSaveErr, loginSaveRes) {
						// Handle Login save error
						if (loginSaveErr) done(loginSaveErr);

						// Get a list of Logins
						agent.get('/logins')
							.end(function(loginsGetErr, loginsGetRes) {
								// Handle Login save error
								if (loginsGetErr) done(loginsGetErr);

								// Get Logins list
								var logins = loginsGetRes.body;

								// Set assertions
								(logins[0].user._id).should.equal(userId);
								(logins[0].name).should.match('Login Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Login instance if not logged in', function(done) {
		agent.post('/logins')
			.send(login)
			.expect(401)
			.end(function(loginSaveErr, loginSaveRes) {
				// Call the assertion callback
				done(loginSaveErr);
			});
	});

	it('should not be able to save Login instance if no name is provided', function(done) {
		// Invalidate name field
		login.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Login
				agent.post('/logins')
					.send(login)
					.expect(400)
					.end(function(loginSaveErr, loginSaveRes) {
						// Set message assertion
						(loginSaveRes.body.message).should.match('Please fill Login name');
						
						// Handle Login save error
						done(loginSaveErr);
					});
			});
	});

	it('should be able to update Login instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Login
				agent.post('/logins')
					.send(login)
					.expect(200)
					.end(function(loginSaveErr, loginSaveRes) {
						// Handle Login save error
						if (loginSaveErr) done(loginSaveErr);

						// Update Login name
						login.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Login
						agent.put('/logins/' + loginSaveRes.body._id)
							.send(login)
							.expect(200)
							.end(function(loginUpdateErr, loginUpdateRes) {
								// Handle Login update error
								if (loginUpdateErr) done(loginUpdateErr);

								// Set assertions
								(loginUpdateRes.body._id).should.equal(loginSaveRes.body._id);
								(loginUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Logins if not signed in', function(done) {
		// Create new Login model instance
		var loginObj = new Login(login);

		// Save the Login
		loginObj.save(function() {
			// Request Logins
			request(app).get('/logins')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Login if not signed in', function(done) {
		// Create new Login model instance
		var loginObj = new Login(login);

		// Save the Login
		loginObj.save(function() {
			request(app).get('/logins/' + loginObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', login.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Login instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Login
				agent.post('/logins')
					.send(login)
					.expect(200)
					.end(function(loginSaveErr, loginSaveRes) {
						// Handle Login save error
						if (loginSaveErr) done(loginSaveErr);

						// Delete existing Login
						agent.delete('/logins/' + loginSaveRes.body._id)
							.send(login)
							.expect(200)
							.end(function(loginDeleteErr, loginDeleteRes) {
								// Handle Login error error
								if (loginDeleteErr) done(loginDeleteErr);

								// Set assertions
								(loginDeleteRes.body._id).should.equal(loginSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Login instance if not signed in', function(done) {
		// Set Login user 
		login.user = user;

		// Create new Login model instance
		var loginObj = new Login(login);

		// Save the Login
		loginObj.save(function() {
			// Try deleting Login
			request(app).delete('/logins/' + loginObj._id)
			.expect(401)
			.end(function(loginDeleteErr, loginDeleteRes) {
				// Set message assertion
				(loginDeleteRes.body.message).should.match('User is not logged in');

				// Handle Login error error
				done(loginDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Login.remove().exec();
		done();
	});
});