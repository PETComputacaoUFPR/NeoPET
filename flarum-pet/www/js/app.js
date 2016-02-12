// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var flarum = angular.module('flarum', ['ionic', 'ngResource','ngCordova'])

.run(function($ionicPlatform, $rootScope, TokenHandler, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    
    PushNotification.hasPermission(function(data) {
      if (data.isEnabled) {
        console.log('isEnabled');
      }else{
        console.log('isNotEnabled');
      }
    });
      var push = PushNotification.init({
        android: {
            senderID: ""
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        },
        windows: {}
    });


    push.on('registration', function(data) {
        console.log("registration: "+ data.registrationId);
        // data.registrationId
    });

   push.on('notification', function(data) {
      console.log("notification:");
      console.log(data.message);
      console.log(data.title);
      console.log(data.count);
      console.log(data.sound);
      console.log(data.image);
      console.log(data.additionalData);
    });

push.on('error', function(e) {
   console.log(e.message);
    // e.message
});
  
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;

    if (requireLogin && TokenHandler.get() === 'none') {
      if(toState.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });

})

.constant("CONFIG", {
  "URL": "http://pet.inf.ufpr.br/forum/"
})

.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
      data: {
        requireLogin: false
      }
    })

    .state('tabs', {
      url: '/tabs',
      templateUrl: 'templates/tabs.html',
      abstract: true,
      data: {
        requireLogin: true
      }
    })

    .state('tabs.discussions', {
      url: '/discussions',
      views: {
        'discussions-tab': {
          templateUrl: 'templates/tab-discussions.html',
          controller: 'DiscussionsCtrl'
        }
      }
    })
    .state('tabs.discussions-details', {
        url: '/d/:id',
        views: {
            'discussions-tab': {
                templateUrl: 'templates/tab-discussion-detail.html',
                controller: 'DiscussionDetailsCtrl',
                resolve: {
                    discussion: function(Discussions, $stateParams) {
                        return Discussions.get({id: $stateParams.id});
                    }
                }
            }
        }
    })

    .state('tabs.notifications', {
      url: '/notifications',
      views: {
        'notifications-tab': {
          templateUrl: 'templates/tab-notifications.html',
          controller: 'NotificationsCtrl'
        }
      }
    })

    .state('tabs.profile', {
      url: '/profile',
      views: {
        'profile-tab': {
          templateUrl: 'templates/tab-profile.html',
          controller: 'ProfileCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/login');


});
