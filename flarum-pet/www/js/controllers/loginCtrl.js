flarum.controller('LoginCtrl', function($scope, TokenHandler, $http, CONFIG, $state, $ionicPopup, $rootScope) {

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

        //TODO:Use angular to do the http request
        //TODO: Use a better scope to store data, maybe session or local storage
        var pushData = "{\n    \"data\":{\n        \"type\": \"devices\",\n        \"id\": null,\n        \"attributes\" : {\n            \"token\": \""+ $rootScope.gcmToken + "\"\n        }\n    }\n}";

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            console.log(this.responseText);
          }
        });

        xhr.open("POST", CONFIG.URL + 'api/push/add');
        xhr.setRequestHeader("authorization", "Token "+ data.token);
        xhr.setRequestHeader("content-type", "application/vnd.api+json");
        xhr.setRequestHeader("accept", "application/vnd.api+json");
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(pushData);

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
