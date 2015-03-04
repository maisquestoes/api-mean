'use strict';

//Emaxiningboards service used to communicate Emaxiningboards REST endpoints
angular.module('emaxiningboards').factory('Emaxiningboards', ['$resource',
	function($resource) {
		return $resource('emaxiningboards/:emaxiningboardId', { emaxiningboardId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);