'use strict';

// Companies controller
angular.module('companies').controller('CompaniesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Companies',
	function($scope, $stateParams, $location, Authentication, Companies) {
		$scope.authentication = Authentication;

		// Create new Company
		$scope.create = function() {
			// Create new Company object
			var company = new Companies ({
				name: this.name
			});

			// Redirect after save
			company.$save(function(response) {
				$location.path('companies/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Company
		$scope.remove = function(company) {
			if ( company ) { 
				company.$remove();

				for (var i in $scope.companies) {
					if ($scope.companies [i] === company) {
						$scope.companies.splice(i, 1);
					}
				}
			} else {
				$scope.company.$remove(function() {
					$location.path('companies');
				});
			}
		};

		// Update existing Company
		$scope.update = function() {
			var company = $scope.company;

			company.$update(function() {
				$location.path('companies/' + company._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Companies
		$scope.find = function() {
			$scope.companies = Companies.query();
		};

		// Find existing Company
		$scope.findOne = function() {
			$scope.company = Companies.get({ 
				companyId: $stateParams.companyId
			});
		};
	}
]);