var module = angular
    .module('sensorResearchApp', [
        'ngRoute'
    ]);

var keyboard = [
    [
        { "key": "1", "keyCode": "49", "selected": false },
        { "key": "2", "keyCode": "50", "selected": false },
        { "key": "3", "keyCode": "51", "selected": false },
        { "key": "4", "keyCode": "52", "selected": false },
        { "key": "5", "keyCode": "53", "selected": false },
        { "key": "6", "keyCode": "54", "selected": false },
        { "key": "7", "keyCode": "55", "selected": false },
        { "key": "8", "keyCode": "56", "selected": false },
        { "key": "9", "keyCode": "57", "selected": false },
        { "key": "0", "keyCode": "48", "selected": false }
    ],
    [
        { "key": "Q", "keyCode": "81", "selected": false },
        { "key": "W", "keyCode": "87", "selected": false },
        { "key": "E", "keyCode": "69", "selected": false },
        { "key": "R", "keyCode": "82", "selected": false },
        { "key": "T", "keyCode": "84", "selected": false },
        { "key": "Y", "keyCode": "89", "selected": false },
        { "key": "U", "keyCode": "85", "selected": false },
        { "key": "I", "keyCode": "73", "selected": false },
        { "key": "O", "keyCode": "79", "selected": false },
        { "key": "P", "keyCode": "80", "selected": false }
    ],
    [
        { "key": "A", "keyCode": "65", "selected": false },
        { "key": "S", "keyCode": "83", "selected": false },
        { "key": "D", "keyCode": "68", "selected": false },
        { "key": "F", "keyCode": "70", "selected": false },
        { "key": "G", "keyCode": "71", "selected": false },
        { "key": "H", "keyCode": "72", "selected": false },
        { "key": "J", "keyCode": "74", "selected": false },
        { "key": "K", "keyCode": "75", "selected": false },
        { "key": "L", "keyCode": "76", "selected": false }
    ],
    [
        { "key": "Z", "keyCode": "90", "selected": false },
        { "key": "X", "keyCode": "88", "selected": false },
        { "key": "C", "keyCode": "67", "selected": false },
        { "key": "V", "keyCode": "86", "selected": false },
        { "key": "B", "keyCode": "66", "selected": false },
        { "key": "N", "keyCode": "78", "selected": false },
        { "key": "M", "keyCode": "77", "selected": false }
    ]
];

module.controller('ExperimentCtrl', ['$scope', '$location', '$rootScope', '$http', '$timeout', function ($scope, $location, $rootScope, $http, $timeout) {
    $scope.keyboard = keyboard;
    $scope.time = 0;
    $scope.results = [];
    $scope.timer = new Stopwatch();
    $scope.currentKeyPressed = null;
    $scope.currentkeySelected = null;
    $scope.isSeeingTimeFixed = false;
    $scope.isStarted = false;
    $scope.isFinished = false;
    $scope.pressSpaceForNext = false;
    $scope.countRepeat = 5;
    $scope.currentNumber = 0;
    $scope.isDataSavedSuccesfull = false;
    $scope.isDataSavedWithError = false;

    $scope.$on('keyPressed', function (events, args) {
        if ($scope.isFinished) {
            return;
        }

        var keyCode = args.keyCode;

        if (!$scope.isStarted && keyCode == 32) {
            $scope.isStarted = true;
            $scope.startScenario();
            return;
        }

        if ($scope.currentkeySelected == null) {
            $scope.currentKeyPressed = keyCode;
            if (keyCode == 32) {
                $scope.pressSpaceForNext = false;
                if ($scope.currentNumber >= $scope.countRepeat) {
                    $scope.postData();
                    $scope.isFinished = true;
                    return;
                }
                $scope.startScenario();
            }
        } else {
            if (keyCode == 32) {
                $scope.isSeeingTimeFixed = true;
                $scope.timer.stop();
                var time = $scope.timer.getTime();
                $scope.results.push({ SeeTime: time, ReactTime: "" });
                $scope.timer.reset();
                $scope.timer.start();
            }
            if ($scope.currentkeySelected == keyCode && $scope.isSeeingTimeFixed) {
                $scope.currentkeySelected = null;
                $scope.timer.stop();
                $scope.results[$scope.results.length - 1].ReactTime = $scope.timer.getTime();
                $scope.timer.reset();
                $scope.currentKeyPressed = keyCode;
                $scope.pressSpaceForNext = true;
                $scope.isSeeingTimeFixed = false;
            }
        }
    });

    $scope.postData = function() {
        $http.post('/Home/SaveResults', { msg: JSON.stringify($scope.results) })
            .success(function (data, status, headers, config) {
                $scope.isDataSavedSuccesfull = true;
            })
            .error(function (data, status, headers, config) {
                $scope.isDataSavedWithError = true;
        });
    };

    $scope.isKeyPressed = function (keyCode) {
        return $scope.currentKeyPressed == keyCode;
    };

    $scope.isKeySelected = function(keyCode) {
        return $scope.currentkeySelected == keyCode;
    };

    $scope.selectRandomKey = function() {
        var i = $scope.getRandomInt(0, 3);
        var j = 0;
        if (i == 0 || i == 1) {
            j = $scope.getRandomInt(0, 9);
        }
        if (i == 2) {
            j = $scope.getRandomInt(0, 8);
        }
        if (i == 3) {
            j = $scope.getRandomInt(0, 6);
        }
        var key = $scope.keyboard[i][j];
        $scope.currentkeySelected = key["keyCode"];
        $scope.keyboard[i][j].selected = true;
    };

    $scope.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    $scope.startScenario = function () {
        var delay = $scope.getRandomInt(1, 10) * 1000;
        $timeout(function() {
            $scope.currentNumber++;
            $scope.currentKeyPressed = null;
            $scope.selectRandomKey();
            $scope.timer.start();
        }, delay);

    };
}]);

module.controller('KeyPressedCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
    $scope.keyPressed = function ($event) {
        $rootScope.$broadcast('keyPressed', $event);
    }
}]);

var Stopwatch = function (options) {
    var offset,
        clock,
        interval;

    options = options || {};
    options.delay = options.delay || 10;

    reset();

    function start() {
        if (!interval) {
            offset = Date.now();
            interval = setInterval(update, options.delay);
        }
    }

    function stop() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    function reset() {
        clock = 0;
    }

    function update() {
        clock += delta();
    }

    function delta() {
        var now = Date.now(),
            d = now - offset;

        offset = now;
        return d;
    }

    function getTime() {
        return clock / 1000;
    }

    this.start = start;
    this.stop = stop;
    this.reset = reset;
    this.getTime = getTime;
};

module.config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
          templateUrl: '/Content/views/home.html',
          controller: 'HomeCtrl'
      })
      .when('/desc', {
          templateUrl: '/Content/views/desc.html',
          controller: 'DescriptionCtrl'
      })
      .when('/options', {
          templateUrl: '/Content/views/options.html',
          controller: 'OptionsCtrl'
      })
      .when('/experiment', {
          templateUrl: '/Content/views/experiment.html',
          controller: 'ExperimentCtrl'
      })
      .when('/results', {
          templateUrl: '/Content/views/results.html',
          controller: 'ResultsCtrl'
      })
      .otherwise({
          redirectTo: '/home'
      });
});

module.controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.isActive = function(routeLocation) {
        return routeLocation === $location.path();
    };
}]);

module.controller('HomeCtrl', ['$scope', '$location', function ($scope, $location) {

}]);

module.controller('ResultsCtrl', ['$scope', '$location', function ($scope, $location) {

}]);

module.controller('OptionsCtrl', ['$scope', '$location', function ($scope, $location) {

}]);

module.controller('DescriptionCtrl', ['$scope', '$location', function ($scope, $location) {

}]);