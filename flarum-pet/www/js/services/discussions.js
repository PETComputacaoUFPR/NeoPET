flarum.factory('Discussions', function($resource, CONFIG, TokenHandler) {
    var resource = $resource(CONFIG.URL + 'api/discussions/:id', {id: '@id'}, {
        update: {method: 'PUT'},
        all: {method: 'GET'}
    });

    resource = TokenHandler.wrapActions(resource, ['query', 'update', 'save', 'get', 'remove', 'delete', 'all']);

    return resource;
});
