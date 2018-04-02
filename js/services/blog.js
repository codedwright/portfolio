function blog($http) {
    var blog = {};
    blog.create = function(password, data) {
        return $http.post('./php/index.php', {
            'action': 'createBlogEntry', 
            'password': password,
            ...data
        })
    }
    blog.read = function() {
        return $http.post('./php/index.php', {
            'action': 'readBlogEntry', 
        })
    }
    blog.update = function(password, data) {
        return $http.post('./php/index.php', {
            'action': 'updateBlogEntry', 
            'password': password,
            ...data
        })
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
