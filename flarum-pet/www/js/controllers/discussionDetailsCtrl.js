flarum.controller('DiscussionDetailsCtrl', function($scope, Discussions, $stateParams) {
    $scope.discussion = Discussions.get({id: $stateParams.id});
    console.log($stateParams.id);
})