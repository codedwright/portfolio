function contact($http) {
    var contact = {};
    contact.mail = function(data) {
        return $http.post('./php/index.php', {
            'action': 'contact',
            ...data
        })
    }
    return contact;
}
app.factory('contact', ['$http', contact]);