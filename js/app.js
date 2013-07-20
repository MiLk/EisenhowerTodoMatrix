function MatrixCtrl($scope) {
  $scope.tasks = {
    'UI': [],
    'NUI': [],
    'UNI': [],
    'NUNI': [],
    'done': []
  };
  $scope.id = 1;

  $scope.submit = function (list) {
    if (this.text) {
      $scope.tasks[list].push({ id: ($scope.id++), name: this.text });
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
