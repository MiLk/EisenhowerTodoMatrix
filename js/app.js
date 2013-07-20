function onError(data, status, headers, config) {
  console.error(status);
  console.error(data);
};

function MatrixCtrl($scope, $http) {

  var api_url = 'http://couchdb.emilienkenler.com:5984/eisenhower';

  $scope.docID = null;
  $scope.tasks = {
    'UI': [],
    'NUI': [],
    'UNI': [],
    'NUNI': [],
    'done': [],
    'id': 1
  };

  $http({
    method: 'GET',
    url: api_url + '/_all_docs'
  }).success(function(data, status, headers, config) {
    $scope.docID = data.rows[0].id;
    $http({
      method: 'GET',
      url: api_url + '/' + $scope.docID
    }).success(function(data, status, headers, config) {
        $scope.tasks = data;
        $scope.$watch('tasks', function(newValue, oldValue) {
          if(  oldValue.UI.length == newValue.UI.length
            && oldValue.UNI.length == newValue.UNI.length
            && oldValue.NUI.length == newValue.NUI.length
            && oldValue.NUNI.length == newValue.NUNI.length
            && oldValue.done.length == newValue.done.length
            ) return;
          $http({
            method: 'PUT',
            url: api_url + '/' +  $scope.docID,
            data: $scope.tasks
          }).success(function(data, status, headers, config) {
            console.log('Saved');
          }).error(onError);
        }, true);
    }).error(onError);
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
