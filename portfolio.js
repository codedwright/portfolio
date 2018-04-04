/*!
 * Portfolio v.2.1.1
 * Copyright (c) 2018 Foo.
 *
 * Author: Joseph Wright (joseph@codedwright.com).
 */

$(document).ready(function(){
    var videos = 7; // total videos
    var video = document.querySelector(".sidebar__video--full-height");
    var source = document.createElement("source");
    var i = 1;
    source.setAttribute("src", "./assets/video/splash" + i + ".mp4");
    // console.log("./assets/video/splash" + i + ".mp4");
    video.appendChild(source);
    video.play();
    i++;
    video.onended = function(){
        if(i > videos) i = 1;
        video.src = "./assets/video/splash" + i + ".mp4";
        // console.log("./assets/video/splash" + i + ".mp4");
        video.load();
        video.play();
        i++;
    }
});





var app = angular.module('portfolio', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ngMap', 'textAngular']);





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
        console.log('Navigating to ./portfolio/' + link);;
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






app.config(['$locationProvider', '$routeProvider', '$httpProvider', 
	function config($locationProvider, $routeProvider, $httpProvider) {
		
		// Push all data to param
		$httpProvider.defaults.transformRequest = function(data){
			if (data === undefined) {
				return data;
			}
			return $.param(data);
		}


		//$routeProvider
		//	.when('/profile', {
		//	templateUrl: '/profile.html',
		//	controller: 'ProfileController',
		//	 only navigate when we've resolved these promises 
		//	resolve: {
		//	name: getName,
		//	profile: getProfile,
		//	anythingElse: getAnythingElse
		//	}
		//	})


		// To recover password you shouldn't have to be logged in, home redirects users to either submit or back to home
		// You have to be admin to view admin stuff
		$routeProvider 
			.when('/', { 
				controller: 'BaseController',
				templateUrl: 'views/about.html',
			})
			.when('/resume', { 
				controller: 'BaseController',
				templateUrl: 'views/resume.html',
			})
			.when('/services', { 
				controller: 'BaseController',
				templateUrl: 'views/services.html',
			})
			.when('/portfolio', { 
				controller: 'BaseController',
				templateUrl: 'views/portfolio.html',
			})
			.when('/portfolio/:link', { 
				controller: 'BaseController',
				templateUrl: 'views/portfolio-page.html',
			})
			.when('/blog', { 
				controller: 'BaseController',
				templateUrl: 'views/blog.html',
			})
			.when('/blog/:link', { 
				controller: 'BaseController',
				templateUrl: 'views/blog-post.html',
			})
			.when('/contact', { 
				controller: 'BaseController', 
				templateUrl: 'views/contact.html'
			})
			.when('/admin', { 
				controller: 'BaseController', 
				templateUrl: 'views/admin.html'
			})
			.when('/admin/portfolio/create', { 
				controller: 'BaseController', 
				templateUrl: 'views/portfolio-create.html'
			})
			.when('/admin/portfolio/update', { 
				controller: 'BaseController', 
				templateUrl: 'views/portfolio-update.html'
			})
			.when('/admin/portfolio/delete', { 
				controller: 'BaseController', 
				templateUrl: 'views/portfolio-delete.html'
			})
			.when('/admin/blog/create', { 
				controller: 'BaseController', 
				templateUrl: 'views/blog-create.html'
			})
			.when('/admin/blog/update', { 
				controller: 'BaseController', 
				templateUrl: 'views/blog-update.html'
			})
			.when('/admin/blog/delete', { 
				controller: 'BaseController', 
				templateUrl: 'views/blog-delete.html'
			})
			.otherwise('/');
			
		$locationProvider.html5Mode(true);
	}
]);

app.run(function($http) {
 	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
});
