'use strict';

//Setting up route
angular.module('emaxiningboards').config(['$stateProvider',
	function($stateProvider) {
		// Emaxiningboards state routing
		$stateProvider.
		state('listEmaxiningboards', {
			url: '/emaxiningboards',
			templateUrl: 'modules/emaxiningboards/views/list-emaxiningboards.client.view.html'
		}).
		state('createEmaxiningboard', {
			url: '/emaxiningboards/create',
			templateUrl: 'modules/emaxiningboards/views/create-emaxiningboard.client.view.html'
		}).
		state('viewEmaxiningboard', {
			url: '/emaxiningboards/:emaxiningboardId',
			templateUrl: 'modules/emaxiningboards/views/view-emaxiningboard.client.view.html'
		}).
		state('editEmaxiningboard', {
			url: '/emaxiningboards/:emaxiningboardId/edit',
			templateUrl: 'modules/emaxiningboards/views/edit-emaxiningboard.client.view.html'
		});
	}
]);