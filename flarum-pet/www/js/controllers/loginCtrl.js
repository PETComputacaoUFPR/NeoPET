flarum.controller('LoginCtrl', function($scope, TokenHandler, $http, CONFIG, $state) {
    
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
            $state.go('tabs');
            
        })
        .error(function(data, status) {
            console.log(data);
        });
    };
})