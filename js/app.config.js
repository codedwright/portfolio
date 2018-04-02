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
