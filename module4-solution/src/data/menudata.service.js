(function() {
  'use strict';

  angular.module('data')
    .service('MenuDataService', MenuDataService);


  MenuDataService.$inject = ['$http', 'ApiBasePath'];

  function MenuDataService($http, ApiBasePath) {
    var service = this;

    // this method should return a promise which is a result of using the $http service,
    // using the following REST API endpoint: https://davids-restaurant.herokuapp.com/categories.json
    service.getAllCategories = function() {
      return $http.get(ApiBasePath + "/categories.json")
        .then(function(response) {
          return response.data;
        });
    };

    // this method should return a promise which is a result of using the $http service,
    // using the following REST API endpoint: https://davids-restaurant.herokuapp.com/menu_items.json?category=,
    // where, before the call to the server, your code should append whatever categoryShortName value
    // was passed in as an argument into the getItemsForCategory method.
    service.getItemsForCategory = function(shortName) {
      return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json"),
          params: {
            category: shortName
          }
        })
        .then(function(response) {
          return response.data;
        });
    };
  }

})();
