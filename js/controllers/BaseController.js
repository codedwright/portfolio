// conotroller pulls in the factory
app.controller('BaseController', ['$scope', '$location', '$filter', '$routeParams', '$timeout', 'NgMap', 'contact', 'portfolio', 'blog', function($scope, $location, $filter, $routeParams, $timeout, NgMap,contact, portfolio, blog) {
    portfolio.read().then((result) => {
        $scope.portfolio = result.data;
        $scope.portfolioDetails = $filter('filter')(result.data, {'link': $routeParams.link}, true)[0];
    }); // then() assign entries
    blog.read().then((result) => {
        $scope.blog = result.data;
        $scope.blogDetails = ($filter('filter')(result.data, {'link': $routeParams.link}, true))[0];
    });

    // Why did I need this??
    $scope.url = (link) => {
        $location.url('/portfolio/' + link);
        console.log('Navigating to ./portfolio/' + link);
    }

    
    $scope.updatePortfolioEntry = {};
    $scope.updatePortfolioContent = () => {
        // this is the wrong way to do this...
        $scope.updatePortfolioEntry.content = $scope.update.content;
    }

    // https://ngmap.github.io/     
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0kIVsmR-dvV6T5RFPpWOujdCrYzRTObo";
    NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    }); 
          
    function close() {
        $timeout(function () {
            $scope.message = false;
        }, 10000);
    }


    $scope.message = false;
    $scope.link = $routeParams.link;
    // alert(JSON.stringify($filter('filter')(blog.entries, {'link': '1'}, true)))
    $scope.portfolioDetails = {title: '', excerpt: ''};
    $scope.blogDetails = {title: '', excerpt: '', content: ''};
    $scope.mail = (data) => {
        alert(JSON.stringify(data));
        contact.mail(data).then((results) => {
            console.log(results);
            $scope.message = results.data;
        }).then(() => {
            close();
        });
    }
    
    $scope.portfolioCreate = (password, data) => {
        // alert(JSON.stringify({
        //     password: password,
        //     ...data
        // }));
        portfolio.create(password, data).then((results) => {
            console.log(results);
            $scope.message = results.data;
        }).then(() => {
            close();
        });
        // !!!!!!!!!!!in factory set a page reload with each of the successes
    }
    
    $scope.portfolioUpdate = (password, data) => {
        // alert(JSON.stringify({
        //     password: password,
        //     blogId: $scope.update.blogId,
        //     ...data
        // }));
        portfolio.update(password, {portfolioId: $scope.update.portfolioId, ...data}).then((results) => {
            console.log(results);
            $scope.message = results.data;
        }).then(() => {
            close();
        });
    }
    $scope.portfolioDelete = (password, portfolioId) => {
        // alert(JSON.stringify({
        //     password: password,
        //     portfolioId: portfolioId.portfolioId
        // }));
        
        portfolio.delete(password, portfolioId.portfolioId).then((results) => {
            console.log(results);
            $scope.message = results.data;
        }).then(() => {
            close();
        });
    }
    $scope.blogCreate = (password, data) => {
        // alert(JSON.stringify({
        //     password: password,
        //     ...data
        // }));
        blog.create(password, data).then((results) => {
            console.log(results);
            $scope.message = results.data;
        }).then(() => {
            close();
        });
    }
    $scope.blogUpdate = (password, data) => {
        // alert(JSON.stringify({
        //     password: password,
        //     blogId: $scope.update.blogId,
        //     ...data
        // }));
        blog.update(password, {blogId: $scope.update.blogId, ...data}).then((results) => {
            console.log(results);
            $scope.message = results.data;
        }).then(() => {
            close();
        });
    }
    $scope.blogDelete = (password, blogId) => {
        // alert(JSON.stringify({
        //     password: password,
        //     portfolioId: portfolioId
        // }));
        blog.delete(password, blogId.blogId).then((results) => {
            console.log(results);
            $scope.message = results.data;
        }).then(() => {
            close();
        });
        // $route.reload();
    }

    $scope.active = (view) => { 
        if (view == '/blog' || view == '/portfolio') {
            var result = $location.path().match(new RegExp('^\/' + view.slice(1)));
            return result == view;
        } else {
            return $location.path() == view;
        }
    };
    
}]);