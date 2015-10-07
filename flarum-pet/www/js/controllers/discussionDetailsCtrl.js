flarum.controller('DiscussionDetailsCtrl', function($scope, Discussions, $stateParams, CONFIG) {
    $scope.discussion = Discussions.get({id: $stateParams.id});

    $scope.getUsername = function(user) {
        var included = $scope.discussion.included;
        for(var i=0; i < included.length; ++i) {
            if(included[i].type === 'users' && included[i].id === user.data.id) {
                return included[i].attributes.username;
            }
        }
        return 'A user';
    }

    $scope.getAvatar = function(user) {
        var included = $scope.discussion.included;
        for(var i=0; i < included.length; ++i) {
            if(included[i].type === 'users' && included[i].id === user.data.id && included[i].attributes.avatarUrl) {
                return 'http://pet.inf.ufpr.br' + included[i].attributes.avatarUrl;
            }
        }
    }
})
