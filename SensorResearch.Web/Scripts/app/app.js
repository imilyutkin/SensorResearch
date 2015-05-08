var module = angular
    .module('sensorResearchApp', [
        'ngRoute'
    ]);

var keyboard = [
    [
        { "key": "1", "keyCode": "49" },
        { "key": "2", "keyCode": "50" },
        { "key": "3", "keyCode": "51" },
        { "key": "4", "keyCode": "52" },
        { "key": "5", "keyCode": "53" },
        { "key": "6", "keyCode": "54" },
        { "key": "7", "keyCode": "55" },
        { "key": "8", "keyCode": "56" },
        { "key": "9", "keyCode": "57" },
        { "key": "0", "keyCode": "48" }
    ],
    [
        { "key": "Q", "keyCode": "81" },
        { "key": "W", "keyCode": "87" },
        { "key": "E", "keyCode": "69" },
        { "key": "R", "keyCode": "82" },
        { "key": "T", "keyCode": "84" },
        { "key": "Y", "keyCode": "89" },
        { "key": "U", "keyCode": "85" },
        { "key": "I", "keyCode": "73" },
        { "key": "O", "keyCode": "79" },
        { "key": "P", "keyCode": "80" }
    ],
    [
        { "key": "A", "keyCode": "65" },
        { "key": "S", "keyCode": "83" },
        { "key": "D", "keyCode": "68" },
        { "key": "F", "keyCode": "70" },
        { "key": "G", "keyCode": "71" },
        { "key": "H", "keyCode": "72" },
        { "key": "J", "keyCode": "74" },
        { "key": "K", "keyCode": "75" },
        { "key": "L", "keyCode": "76" }
    ],
    [
        { "key": "Z", "keyCode": "90" },
        { "key": "X", "keyCode": "88" },
        { "key": "C", "keyCode": "67" },
        { "key": "V", "keyCode": "86" },
        { "key": "B", "keyCode": "66" },
        { "key": "N", "keyCode": "78" },
        { "key": "M", "keyCode": "77" }
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
    $scope.countRepeat = 20;
    $scope.currentNumber = 0;
    $scope.isDataSavedSuccesfull = false;
    $scope.isDataSavedWithError = false;
    $scope.experimentScope = [];
    $scope.experimentScopeKeys = [];

    $scope.isInScope = function (keyCode) {
        var index = $.inArray(keyCode, $scope.experimentScopeKeys);
        return index != -1;
    };

    $scope.$on('keyPressed', function (events, args) {
        if ($scope.isFinished) {
            return;
        }

        var keyCode = args.keyCode;

        if (!$scope.isStarted && keyCode == 32) {
            $scope.isStarted = true;
            $scope.selectKeyboardScope();
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

    $scope.selectKeyboardScope = function() {
        var countOfStimuls = $scope.countOfStimuls;
        var currentCount = 0;
        while (currentCount < countOfStimuls) {
            var point = $scope.selectRandomKey();
            var key = $scope.keyboard[point.i][point.j];
            if (!$scope.isInScope(key.keyCode)) {
                $scope.experimentScope.push(key);
                $scope.experimentScopeKeys.push(key.keyCode);
                currentCount++;
            }
        }
    };

    $scope.postData = function() {
        $http.post('/Home/SaveResults', { msg: JSON.stringify($scope.results.reverse()) })
            .success(function (data, status, headers, config) {
                $scope.isDataSavedSuccesfull = true;
                $rootScope.experimentResultId = data.id;
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
        return { i: i, j: j };

    };

    $scope.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    $scope.startScenario = function () {
        var delay = $scope.getRandomInt(1, 10) * 1000;
        $timeout(function() {
            $scope.currentNumber++;
            $scope.currentKeyPressed = null;
            $scope.selectRandomKeyFromScope();
            $scope.timer.start();
        }, delay);
    };
    
    $scope.selectRandomKeyFromScope = function() {
        var i = $scope.getRandomInt(0, $scope.experimentScopeKeys.length - 1);

        var keyCode = $scope.experimentScopeKeys[i];
        $scope.currentkeySelected = keyCode;
    };

    $scope.init = function() {
        if (!$rootScope.countOfStimuls) {
            $scope.countOfStimuls = 1;
        } else {
            $scope.countOfStimuls = $rootScope.countOfStimuls;
        }
        if (!$rootScope.distance) {
            $scope.distance = 10;
        } else {
            $scope.distance = $rootScope.distance;
        }
    };

    $scope.init();
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

module.controller('ResultsCtrl', ['$scope', '$location', '$rootScope', '$http', function ($scope, $location, $rootScope, $http) {
    $scope.index = 1;
    $scope.showError = true;

    $scope.getExperimentResult = function () {
        if ($rootScope.experimentResultId) {
            var url = 'Home/GetResultData?id=' + $rootScope.experimentResultId;
            $http.get(url)
                .success(function (data, status, headers, config) {
                    $scope.showError = false;
                    console.log(JSON.parse(data));
                    $scope.result = JSON.parse(data);
                    var results = $scope.result.ExperimentDatas;
                    for (var i = 0; i < results.length; i++) {
                        results[i].index = i + 1;
                    }
                    $scope.result.ExperimentDatas = results;
                })
                .error(function(data, status, headers, config) {
                $scope.showError = true;$scope.showError = true;
            });
        }
    };

    $scope.isShowError = function() {
        return $scope.showError;
    }

    $scope.getExperimentResult();
}]);

module.controller('OptionsCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {

    $scope.countOfStimuls = "1";
    $scope.distance = "10";

    $scope.synchronize = function() {
        $rootScope.countOfStimuls = parseInt($scope.countOfStimuls);
        $rootScope.distance = parseInt($scope.distance);
    };

    $scope.synchronize();
}]);

module.controller('DescriptionCtrl', ['$scope', '$location', function ($scope, $location) {

}]);