(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
      var ddo = {
        templateUrl : 'foundItems.html',
        scope: {
          items: '<',
          onRemove: '&'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'list',
        bindToController: true,
        link: FoundItemsDirectiveLink
      };

      return ddo;
    }

    function FoundItemsDirectiveLink(scope, element, attrs, controller) {
      scope.$watch('list.isEmptySearch()', function (newValue, oldValue) {

        if (newValue === true) {
          displayEmptyMessage();
        }
        else {
          removeEmptyMessage();
        }

      });

      function displayEmptyMessage() {
        // If jQuery included before Angluar
        var warningElem = element.find("div.empty_list");
        warningElem.slideDown(900);
      }


      function removeEmptyMessage() {
        // If jQuery included before Angluar
        var warningElem = element.find("div.empty_list");
        warningElem.css("display", "none");
      }
    }


    function FoundItemsDirectiveController() {
      var list = this;

      list.isEmptySearch = function () {
        return list.items != undefined && list.items.length === 0;
      };
    }


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var list = this;

        list.searchTerm = "";

        list.find = function () {
          if(list.searchTerm === ""){
            list.found = [];
            return;
          }
          var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
          promise.then(function (response) {
            list.found = response;
          });
        }

        list.removeItem = function (itemIndex) {
          list.found.splice(itemIndex, 1);
        };

    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function(result) {
                // process result and only keep items that match
                var foundItems = []
                var menu_items = result.data.menu_items;
                for (var i = 0; i < menu_items.length; i++) {
                  if(menu_items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1){
                      foundItems.push(menu_items[i]);
                  }
                }
                console.log(foundItems);
                // return processed items
                return foundItems;
            });
        };
    }

})();
