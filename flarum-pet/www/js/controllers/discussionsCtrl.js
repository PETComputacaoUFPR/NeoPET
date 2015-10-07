flarum.controller('DiscussionsCtrl', function($scope, Discussions) {
    $scope.discussions = Discussions.all();

    $scope.isRead = function(discussion) {
        console.log(discussion.attributes.title);
        console.log(discussion.attributes.readNumber);
        console.log(discussion.attributes.commentsCount);
        if(discussion.attributes.readNumber !== discussion.attributes.commentsCount) {
            return 'badge-assertive';
        }
    }
})
