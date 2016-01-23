

var app = angular.module('wpAngularTheme',['ui.router','ngResource','ui.tinymce'])
	
	//RUNFUNC
	.run(function($rootScope){	
		$rootScope.dir = ajaxInfo.template_directory;
		$rootScope.tinymceOptions = {
			skin:'lightgray',
			height:300
		};
		
		$rootScope.is_admin = ajaxInfo.is_admin;
		console.log($rootScope);
	})
	
	//ROUTES
	.config(function($stateProvider,$urlRouterProvider,$locationProvider){
		
		$locationProvider.hashPrefix('!');
		$locationProvider.html5Mode( true );
		$urlRouterProvider.otherwise('/');
		
		$stateProvider
			.state('list',{
				url:'/',
				controller:'listView',
				templateUrl:ajaxInfo.template_directory+'templates/list.html'
			})
			.state('listpage',{
				url:'/paged/:pageId',
				controller:'listView',
				templateUrl:ajaxInfo.template_directory+'templates/list.html'
			})
			.state('single',{
				url:'/:slug',
				controller:'singleView',
				templateUrl:ajaxInfo.template_directory+'templates/single.html'
			})
			.state('single2',{
				url:'/:slug/',
				controller:'singleView',
				templateUrl:ajaxInfo.template_directory+'templates/single.html'
			})
			.state('category',{
				url:'/category/:category',
				controller:'CategoryController',
				templateUrl:ajaxInfo.template_directory+'templates/list.html'
			})
			.state('category2',{
				url:'/category/:category/',
				controller:'CategoryController',
				templateUrl:ajaxInfo.template_directory+'templates/list.html'
			})
			.state('tags',{
				url:'/tag/:tags',
				controller:'TagsController',
				templateUrl:ajaxInfo.template_directory+'templates/list.html'
			})
			.state('tags2',{
				url:'/tag/:tags/',
				controller:'TagsController',
				templateUrl:ajaxInfo.template_directory+'templates/list.html'
			})
			.state('author',{
				url:'/author/:author_name',
				controller:'AuthorController',
				templateUrl:ajaxInfo.template_directory+'templates/list.html'
			})
			.state('author2',{
				url:'/author/:author_name/',
				controller:'AuthorController',
				templateUrl:ajaxInfo.template_directory+'templates/list.html'
			})
		

	})
	
