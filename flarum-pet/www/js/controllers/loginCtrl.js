flarum.controller('LoginCtrl', function($scope, TokenHandler, $http, CONFIG, $state, $ionicPopup, $rootScope) {

    // If we have a token, we don't log in
    // (and assume the token is valid for now)
    if(TokenHandler.get()) {
        TokenHandler.set(TokenHandler.get())
        $state.go('tabs.discussions');
    }

    $scope.login = function(user) {

        var payload = {
            identification: user.username,
            password: user.password
        };

        console.log(payload);

        $http.post(CONFIG.URL + 'api/token', payload)
        .success(function(data, status) {
            console.log(data);
            $rootScope.userId = data.userId;
            TokenHandler.set(data.token);
            $state.go('tabs.discussions');
        })
        .error(function(data, status) {
            console.log(data);
            user.password = '';
            var alert = $ionicPopup.alert({
                title: 'Ocorreu um erro!',
                template: 'Tente entrar novamente'
            });
        });
    };
})
