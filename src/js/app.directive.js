'use strict';

angular.module('wpAngularTheme')

		.directive( 'navigation', function() {
		    return {
		        restrict: 'E',
		        templateUrl: ajaxInfo.template_directory + 'templates/navigation.html',
		    }
		})
		
		.directive( 'sidebar', function() {
		    return {
		        restrict: 'E',
		        templateUrl: ajaxInfo.template_directory + 'templates/sidebar.html',
		        controller: function($scope, wp){
					wp.getSidebar('right-sidebar').then(function (response){
				      $scope.sidebar_right=response.data;
				    });
			    }
		    }
		})