'use strict';

// Configuring the Articles module
angular.module('questions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Questões', 'questions', 'dropdown', '/questions(/create)?');
		Menus.addSubMenuItem('topbar', 'questions', 'Lista de Questões', 'questions');
		Menus.addSubMenuItem('topbar', 'questions', 'Nova Questão', 'questions/create');
	}
]);