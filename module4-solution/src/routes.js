(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
            .state('home', {
                url: '/',
                templateUrl: 'src/menuapp/templates/home.template.html'
            })

            // categories
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/menuapp/templates/menuapp-categories.template.html',
                controller: 'MenuAppCategoriesController as categoriesCtrl',
                resolve: {
                    categories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })

            // items
            .state('items', {
                url: '/categories/{categoryShortName}',
                templateUrl: 'src/menuapp/templates/category-items.template.html',
                controller: 'ItemsController as itemsCtrl',
                resolve: {
                    items: ['$stateParams', 'MenuDataService',
                        function ($stateParams, MenuDataService) {
                            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                        }]
                }
            });
    }

})();
