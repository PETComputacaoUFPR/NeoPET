flarum.controller('LoginCtrl', function($scope, TokenHandler, $http, CONFIG, $state, $ionicPopup) {

    $scope.login = function(user) {

        var payload = {
            identification: user.username,
            password: user.password
        };

        console.log(payload);

        $http.post(CONFIG.URL + 'api/token', payload)
        .success(function(data, status) {
            console.log(data);
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
