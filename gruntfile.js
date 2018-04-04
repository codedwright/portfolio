(function () {
    'use strict';
}());
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		build: '<%= new Date().getTime() %>',
		product: '<%= _.capitalize(pkg.name) %>',
		copyrightNotice: 'Copyright (c) <%= grunt.template.today("yyyy") %> Foo.',
		banner: 
			"/*!\n" +
			" * <%= product %> v.<%= pkg.version %>\n" +
			" * <%= copyrightNotice %>\n" +
			" *\n" +
			" * Author: <%= pkg.author.name %> (<%= pkg.author.email %>).\n" +
			" */\n\n",

		concat: {
            options: {
				stripBanners: false,
				banner: '<%= banner %>',
				separator: '\n\n\n\n\n\n'
			},
			lib: {
				src: [
					'node_modules/angular/angular.min.js', 
					'node_modules/angular-route/angular-route.min.js',
					'node_modules/angular-animate/angular-animate.min.js',
					'node_modules/angular-sanitize/angular-sanitize.js',
					'node_modules/ngmap/build/scripts/ng-map.min.js',
					'node_modules/textangular/dist/textAngular-rangy.min.js',
					'node_modules/textangular/dist/textAngular-sanitize.min.js', 
					'node_modules/textangular/dist/textAngular.min.js', 
				],
                dest: 'scripts.js'
			},
            dist: {
                src: [
					'js/video-sidebar.js',
					'js/app.js',
					'js/controllers/*.js',
					'js/services/*.js',
					'js/app.config.js'
				],
                dest: '<%= pkg.name %>.js'
            }
        },

		uglify: {
			options: {
				banner: '<%= banner %>',
				mangle: false,
			},
			build: {
				src: '<%= pkg.name %>.js',
				dest: '<%= pkg.name %>.min.js'
			}
		},

		jshint: {
			files: ['gruntfile.js', 'js/portfolio.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},

		compass: {
			dist: {
				options: {
					sassDir: 'css',
					cssDir: 'css',
					sourcemap: true,
					environment: 'development',
					outputStyle: 'compressed'
				}
			}
		},


		'ftp-deploy': {
			build: {
				auth: {
					host: 'ftp.codedwright.com',
					port: 21,
					authKey: 'key1'
				},
				src: './',
				dest: '/public_html/',
				exclusions: [
					'**/.DS_Store',
					'./.sass-cache',
					'./css/partials',
					'./css/font-awesome',
					'./css/style.scss',
					'./css/style.css.map',
					'./js',
					'./legacy',
					'./node_modules',
					'./.gitignore',
					'./package-lock.json',
					'./.git'
				]
			}
		},

		bump: {
			options: {
				files: ['package.json'],
				updateConfigs: [],
				commit: true,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['package.json'],
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: true,
				pushTo: 'origin',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
				globalReplace: false,
				prereleaseName: false,
				metadata: '',
				regExp: false
			}
		},

		watch: {
			options: {
		    	livereload: true
		    },
			css: {
				files: '**/*.scss',
	            tasks: 'compass',
	            
			},
			js: {
				files: ['js/*.js', 'js/**/*.js'],
				tasks: ['concat', 'uglify'],
            },
            html: {
            	files: '**/*.html'
            }
        }	


	});

	// Load the plugin that provides the "uglify" task.
	
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify']);
	grunt.registerTask('deploy', ['ftp-deploy']);

	// https://github.com/semantic-release/semantic-release
	// https://docs.npmjs.com/getting-started/semantic-versioning
	grunt.loadNpmTasks('grunt-bump');
};