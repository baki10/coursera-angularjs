(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyList = this;

        toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

        toBuyList.buy = function(itemIndex) {
            ShoppingListCheckOffService.buy(itemIndex);
        };

        toBuyList.items.isEmpty = function () {
            return toBuyList.items.length == 0;
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtList = this;

        boughtList.items = ShoppingListCheckOffService.getBoughtItems();

        boughtList.items.isEmpty = function () {
            return boughtList.items.length == 0;
        }
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [{
                name: "Cookies",
                quantity: "10"
            },
            {
                name: "Milk",
                quantity: "2"
            },
            {
                name: "Pepsi",
                quantity: "3"
            },
            {
                name: "Chokolate",
                quantity: "2"
            },
            {
                name: "Beer",
                quantity: "5"
            }
        ];
        var boughtItems = [];

        service.buy = function(itemIndex) {
            var item = {
                name: toBuyItems[itemIndex].name,
                quantity: toBuyItems[itemIndex].quantity
            };
            boughtItems.push(item);
            toBuyItems.splice(itemIndex, 1);
        };

        service.getToBuyItems = function() {
            return toBuyItems;
        };

        service.getBoughtItems = function() {
            return boughtItems;
        };
    }

})();
