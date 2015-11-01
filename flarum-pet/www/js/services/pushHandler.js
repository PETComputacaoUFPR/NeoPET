flarum.factory('PushHandler', function($rootScope,$cordovaLocalNotification){

	var pushHandler = {};

	pushHandler.init = function(){

	}
	pushHandler.notifyNewPost = function(discussion){

		$cordovaLocalNotification.add({
		  id: "1234",
		  date: new Date(),
		  message: "This is a message",
		  title: discussion.attributes.title,
		  autoCancel: true,
		  sound: null
		}).then(function () {
		  console.log("The notification has been set");
		});
	}
	return pushHandler;
});