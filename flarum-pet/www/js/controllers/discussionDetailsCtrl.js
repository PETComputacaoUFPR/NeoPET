flarum.controller('DiscussionDetailsCtrl', function($scope, discussion, $stateParams, CONFIG) {
    $scope.discussion = discussion;

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

    $scope.getUrl = function() {
        var txtSrc = discussion.data.id + ' ' + discussion.data.attributes.title;
        var output = txtSrc.replace(/[^a-zA-Z0-9]/g,' ').replace(/\s+/g,"-").toLowerCase();
        /* remove first dash */
        if(output.charAt(0) == '-') output = output.substring(1);
        /* remove last dash */
        var last = output.length-1;
        if(output.charAt(last) == '-') output = output.substring(0, last);

        return CONFIG.URL + 'd/' + output;
    }
})
