(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('MenuAppCategoriesController', MenuAppCategoriesController);


    MenuAppCategoriesController.$inject = ['MenuDataService', 'categories'];

    function MenuAppCategoriesController(MenuDataService, categories) {
        var categoriesCtrl = this;
        categoriesCtrl.categories = categories;
    }

})();
