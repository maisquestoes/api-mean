'use strict';

// Emaxiningboards controller
angular.module('emaxiningboards').controller('EmaxiningboardsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Emaxiningboards',
	function($scope, $stateParams, $location, Authentication, Emaxiningboards) {
		$scope.authentication = Authentication;

		// Create new Emaxiningboard
		$scope.create = function() {
			// Create new Emaxiningboard object
			var emaxiningboard = new Emaxiningboards ({
				name: this.name
			});

			// Redirect after save
			emaxiningboard.$save(function(response) {
				$location.path('emaxiningboards/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Emaxiningboard
		$scope.remove = function(emaxiningboard) {
			if ( emaxiningboard ) { 
				emaxiningboard.$remove();

				for (var i in $scope.emaxiningboards) {
					if ($scope.emaxiningboards [i] === emaxiningboard) {
						$scope.emaxiningboards.splice(i, 1);
					}
				}
			} else {
				$scope.emaxiningboard.$remove(function() {
					$location.path('emaxiningboards');
				});
			}
		};

		// Update existing Emaxiningboard
		$scope.update = function() {
			var emaxiningboard = $scope.emaxiningboard;

			emaxiningboard.$update(function() {
				$location.path('emaxiningboards/' + emaxiningboard._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Emaxiningboards
		$scope.find = function() {
			$scope.emaxiningboards = Emaxiningboards.query();
		};

		// Find existing Emaxiningboard
		$scope.findOne = function() {
			$scope.emaxiningboard = Emaxiningboards.get({ 
				emaxiningboardId: $stateParams.emaxiningboardId
			});
		};
	}
]);