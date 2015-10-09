flarum.controller('ProfileCtrl', function($scope, $rootScope, Users) {
    $scope.user = Users.get({id: $rootScope.userId});
})
