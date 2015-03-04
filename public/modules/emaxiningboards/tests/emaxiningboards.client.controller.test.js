'use strict';

(function() {
	// Emaxiningboards Controller Spec
	describe('Emaxiningboards Controller Tests', function() {
		// Initialize global variables
		var EmaxiningboardsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Emaxiningboards controller.
			EmaxiningboardsController = $controller('EmaxiningboardsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Emaxiningboard object fetched from XHR', inject(function(Emaxiningboards) {
			// Create sample Emaxiningboard using the Emaxiningboards service
			var sampleEmaxiningboard = new Emaxiningboards({
				name: 'New Emaxiningboard'
			});

			// Create a sample Emaxiningboards array that includes the new Emaxiningboard
			var sampleEmaxiningboards = [sampleEmaxiningboard];

			// Set GET response
			$httpBackend.expectGET('emaxiningboards').respond(sampleEmaxiningboards);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.emaxiningboards).toEqualData(sampleEmaxiningboards);
		}));

		it('$scope.findOne() should create an array with one Emaxiningboard object fetched from XHR using a emaxiningboardId URL parameter', inject(function(Emaxiningboards) {
			// Define a sample Emaxiningboard object
			var sampleEmaxiningboard = new Emaxiningboards({
				name: 'New Emaxiningboard'
			});

			// Set the URL parameter
			$stateParams.emaxiningboardId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/emaxiningboards\/([0-9a-fA-F]{24})$/).respond(sampleEmaxiningboard);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.emaxiningboard).toEqualData(sampleEmaxiningboard);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Emaxiningboards) {
			// Create a sample Emaxiningboard object
			var sampleEmaxiningboardPostData = new Emaxiningboards({
				name: 'New Emaxiningboard'
			});

			// Create a sample Emaxiningboard response
			var sampleEmaxiningboardResponse = new Emaxiningboards({
				_id: '525cf20451979dea2c000001',
				name: 'New Emaxiningboard'
			});

			// Fixture mock form input values
			scope.name = 'New Emaxiningboard';

			// Set POST response
			$httpBackend.expectPOST('emaxiningboards', sampleEmaxiningboardPostData).respond(sampleEmaxiningboardResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Emaxiningboard was created
			expect($location.path()).toBe('/emaxiningboards/' + sampleEmaxiningboardResponse._id);
		}));

		it('$scope.update() should update a valid Emaxiningboard', inject(function(Emaxiningboards) {
			// Define a sample Emaxiningboard put data
			var sampleEmaxiningboardPutData = new Emaxiningboards({
				_id: '525cf20451979dea2c000001',
				name: 'New Emaxiningboard'
			});

			// Mock Emaxiningboard in scope
			scope.emaxiningboard = sampleEmaxiningboardPutData;

			// Set PUT response
			$httpBackend.expectPUT(/emaxiningboards\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/emaxiningboards/' + sampleEmaxiningboardPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid emaxiningboardId and remove the Emaxiningboard from the scope', inject(function(Emaxiningboards) {
			// Create new Emaxiningboard object
			var sampleEmaxiningboard = new Emaxiningboards({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Emaxiningboards array and include the Emaxiningboard
			scope.emaxiningboards = [sampleEmaxiningboard];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/emaxiningboards\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEmaxiningboard);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.emaxiningboards.length).toBe(0);
		}));
	});
}());