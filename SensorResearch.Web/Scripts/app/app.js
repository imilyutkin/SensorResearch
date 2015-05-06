angular
    .module('sensorResearchApp', []);

angular.module('sensorResearchApp')
  .controller('KeyboardCtrl', ['$scope', '$location', function ($scope, $location) {
      $scope.keyPressed = function ($event) {
          console.log("hello");
      }
  }]);
