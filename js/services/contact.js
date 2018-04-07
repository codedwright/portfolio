function contact($http) {
    var contact = {};
    contact.mail = function(data) {
        data.action = 'contact';
        return $http.post('./php/index.php', contact)
    }
    return contact;
}
app.factory('contact', ['$http', contact]);