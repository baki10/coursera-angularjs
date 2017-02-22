(function () {
  'use strict';

  angular.module('LunchCheck',[])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController ($scope) {
    $scope.menuList = "";
    $scope.message = "";
    $scope.messageStyle = {};
    $scope.check = function (){
      var count = countOfItems($scope.menuList);

      $scope.messageStyle = {'color':'green'};
      $scope.inputStyle = {'border-style':'solid', 'border-color':'green'};
      if(count === 0){
        $scope.messageStyle = {'color':'red'};
        $scope.inputStyle = {'border-style':'solid', 'border-color':'red'};
        $scope.message = "Please enter data first";
      } else if(count <= 3){
        $scope.message = "Enjoy!";
      } else if(count > 3){
        $scope.message = "Too much!";
      }
    }

    var countOfItems = function (string){
      var count = 0;
      var arrayOfStrings = string.split(',');
      for (var i = 0; i < arrayOfStrings.length; i++) {
        var item = arrayOfStrings[i];
        if(item.trim() != ""){
          count++;
        }
      }
      return count;
    }

  };
})();
