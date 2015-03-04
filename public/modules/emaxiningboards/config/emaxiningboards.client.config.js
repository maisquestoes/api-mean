'use strict';

// Configuring the Articles module
angular.module('emaxiningboards').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Emaxiningboards', 'emaxiningboards', 'dropdown', '/emaxiningboards(/create)?');
		Menus.addSubMenuItem('topbar', 'emaxiningboards', 'List Emaxiningboards', 'emaxiningboards');
		Menus.addSubMenuItem('topbar', 'emaxiningboards', 'New Emaxiningboard', 'emaxiningboards/create');
	}
]);