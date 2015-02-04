'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	JsonReturn = require('../models/jsonreturn.server.model.js');
/**
 * Globals
 */
 var jsonReturn;

/**
 * Unit tests
 */
describe('Jsonreturn tests:', function() {
	describe('Method constructor', function() {
		it('should be instatiated empty without problems', function(done) {
			jsonReturn = new JsonReturn();
			jsonReturn.should.have.property('m', '');
			return done();
		});
	});
});