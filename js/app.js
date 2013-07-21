angular.module('Matrix', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
      when('/', { templateUrl: 'partials/home.html', controller: HomeCtrl }).
      when('/todo/:docId', { templateUrl: 'partials/matrix.html', controller: MatrixCtrl }).
      otherwise({ redirectTo: '/' });
  }]);

function onError(data, status, headers, config) {
  console.error(status);
  console.error(data);
};

var api_url = 'http://my.couchdb.server:5984/eisenhower';

function MatrixCtrl($scope, $http, $routeParams) {
  $scope.docID = $routeParams.docId;
  $scope.tasks = {
    'UI': [],
    'NUI': [],
    'UNI': [],
    'NUNI': [],
    'done': [],
    'id': 1,
    'date': ''
  };
  $scope.rev = 0;

  $http({
    method: 'GET',
    url: api_url + '/' + $scope.docID
  }).success(function (data, status, headers, config) {
      $scope.tasks = data;
      $scope.rev = $scope.tasks._rev.match(/^(\d+)/)[1];
      $scope.$watch('tasks', function (newValue, oldValue) {
        if (oldValue.UI.length == newValue.UI.length
          && oldValue.UNI.length == newValue.UNI.length
          && oldValue.NUI.length == newValue.NUI.length
          && oldValue.NUNI.length == newValue.NUNI.length
          && oldValue.done.length == newValue.done.length
          ) return;
        $scope.tasks.date = new Date();
        $http({
          method: 'PUT',
          url: api_url + '/' + $scope.docID,
          data: $scope.tasks
        }).success(function (data, status, headers, config) {
            console.log('Saved with rev ' + data.rev);
            $scope.tasks._rev = data.rev;
            $scope.rev = $scope.tasks._rev.match(/^(\d+)/)[1];
          }).error(onError);
      }, true);
    }).error(onError);

  $scope.submit = function (list) {
    if (this.text) {
      $scope.tasks[list].push({ id: ($scope.tasks.id++), name: this.text });
      this.text = '';
      $scope['showForm' + list] = !$scope['showForm' + list];
    }
  }

  $scope.remove = function ($event) {
    var id = $($event.target).attr('data-id');
    var list = $($event.target).attr('data-list');
    _.filter($scope.tasks[list],function (task) {
      return task.id == id;
    }).forEach(function (task) {
        $scope.tasks['done'].push(task);
      });
    $scope.tasks[list] = _.reject($scope.tasks[list], function (task) {
      return task.id == id;
    });
  }
}

function HomeCtrl($scope, $http) {
  $scope.users = [];

  $http({
    method: 'GET',
    url: api_url + '/_design/users/_view/list'
  }).success(function (data, status, headers, config) {
      $scope.users = data.rows;
    }).error(onError);

  $scope.new = function () {
    var doc = {
      'UI': [],
      'NUI': [],
      'UNI': [],
      'NUNI': [],
      'done': [],
      'id': 1,
      'user': $('#inputName').val()
    };
    $http({
      method: 'POST',
      url: api_url + '/',
      data: doc
    }).success(function (data, status, headers, config) {
        window.location = '/#/todo/' + data.id;
      }).error(onError);
  }
};
