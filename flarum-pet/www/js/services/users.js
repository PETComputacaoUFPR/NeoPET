flarum.factory('Users', function($resource, CONFIG, TokenHandler) {
    var resource = $resource(CONFIG.URL + 'api/users/:id', {
        id:'@id'
    }, {
        update: {method: 'PUT'}
    });
    
    resource = TokenHandler.wrapActions(resource, ['query', 'update', 'save', 'get', 'remove', 'delete'])
    
    return resource;
});