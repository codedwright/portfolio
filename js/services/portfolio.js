function portfolio($http) {
    var portfolio = {};
    portfolio.create = function(password, data) {
        // alert(JSON.stringify({
        //     password: password,
        //     ...data
        // }));
        
        return $http.post('./php/index.php', {
            'action': 'createPortfolioEntry', //this is the problem
            'password': password,
            ...data
        })
    }
    portfolio.read = function() {
        return $http.post('./php/index.php', {
            'action': 'readPortfolioEntry', //this is the problem
        })
    }
    portfolio.update = function(password, data) {
        return $http.post('./php/index.php', {
            'action': 'updatePortfolioEntry', //this is the problem
            'password': password,
            ...data
        })
    }
    portfolio.delete = function(password, portfolioId) {
        return $http.post('./php/index.php', {
            'action': 'deletePortfolioEntry', //this is the problem
            'password': password,
            'portfolioId': portfolioId
        })
    }
    return portfolio;
}

app.factory('portfolio', ['$http', portfolio]);
