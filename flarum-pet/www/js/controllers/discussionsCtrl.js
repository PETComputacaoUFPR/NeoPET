flarum.controller('DiscussionsCtrl', function($scope, Discussions) {
    $scope.discussions = Discussions.all();

    $scope.isRead = function(discussion) {
        if(discussion.attributes.readNumber !== discussion.attributes.commentsCount) {
            return 'badge-assertive';
        }
    }
})
