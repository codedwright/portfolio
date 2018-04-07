function blog($http) {
    var blog = {};
    blog.create = function(password, data) {
        data.action = 'createBlogEntry';
        data.password = password;
        return $http.post('./php/index.php', data)
    }
    blog.read = function() {
        return $http.post('./php/index.php', {
            'action': 'readBlogEntry', 
        })
    }
    blog.update = function(password, data) {
        data.action = 'updateBlogEntry';
        data.password = password;
        return $http.post('./php/index.php', data);
    }
    blog.delete = function(password, blogId) {
        return $http.post('./php/index.php', {
            'action': 'deleteBlogEntry', 
            'password': password,
            'blogId': blogId
        })
    }
    return blog;
}

app.factory('blog', ['$http', blog]);
