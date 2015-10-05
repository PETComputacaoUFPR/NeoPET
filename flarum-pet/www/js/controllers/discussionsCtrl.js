flarum.controller('DiscussionsCtrl', function($scope, Discussions) {
    $scope.discussions = Discussions.all();
})