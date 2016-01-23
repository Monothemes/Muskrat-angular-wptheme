'use strict';

angular.module('wpAngularTheme')
	
	// Author
	.controller('AuthorController', ['$scope','$stateParams','wp', function($scope,$stateParams, wp){
		console.log( 'AuthorController load');
		wp.getPostinAuthor( $stateParams.author_name ).then(function (response){
	      $scope.posts=response.data;
	    });
	}])

	// Category
	.controller('CategoryController', ['$scope','$stateParams','wp', function($scope,$stateParams, wp){
		console.log( 'CategoryController load');
		wp.getPostsInCategory( $stateParams.category ).then(function (response){
	      $scope.posts=response.data;
	    });
	}])

	// Tags
	.controller('TagsController', ['$scope','$stateParams','wp', function($scope,$stateParams, wp){
		console.log( 'TagsController load');
		wp.getPostinTags( $stateParams.tags ).then(function (response){
	      $scope.posts=response.data;
	    });
	}])

	// menu
	.controller('menuView', ['$scope','wp', function($scope, wp){
		console.log( 'menuView controller loaded' );
		wp.navMenus('header-menu').then(function (response){
	      $scope.nav_menu_header=response.data;
	    });
	}])

	// sidebar
	.controller('sidebarView', ['$scope','wp', function($scope, wp){
		console.log( 'sidebarView controller loaded' );
	    wp.getSidebar('right-sidebar').then(function (response){
	      $scope.sidebar_right=response.data;
	    });
	}])

	//main loop + edit/del post + add new post
	.controller('listView', ['$scope','$http','$stateParams','Posts','wp', function($scope,$http,$stateParams,Posts, wp){
		
		console.log( 'listView controller loaded' );
		//console.log($scope);
	
		// set currentPage & posts_per_page
		$scope.load_param = function() {
			if ($stateParams.pageId) {
				var currentPage = parseInt($stateParams.pageId);
			} else if ($scope.currentPage){
				var currentPage = $scope.currentPage
			} else{
				var currentPage = 1;
			}
			$scope.currentPage = currentPage;
			$scope.posts_per_page = ajaxInfo.posts_per_page;
			console.log('load load_param');
		};

		//load post
		$scope.refreshPosts = function(){
			$http.get(ajaxInfo.api_url + 'posts?page=' + $scope.currentPage+'&per_page='+ $scope.posts_per_page)
				.success(function(res, status, headers){
					// $scope.currentPage = currentPage;
					$scope.totalPages = headers('X-WP-TotalPages');
					$scope.posts = res;
			})
			console.log('load refreshPosts');
			console.log($scope);
		};

		//run
		$scope.load_param();
		$scope.refreshPosts();

		// pagination
	    $scope.Paged_next = function(){
	        setTimeout(function(){
	            $scope.$apply(function(){
	         		$scope.currentPage = parseInt($scope.currentPage)+1;
	            });
	            console.log('load Paged_next');
	        	$scope.load_param();
	        	$scope.refreshPosts();
	        },1);
	    };
	    $scope.Paged_prev = function(){
	        setTimeout(function(){
	            $scope.$apply(function(){
	         		$scope.currentPage = parseInt($scope.currentPage)-1;
	            });
	            console.log('load Paged_prev');
	        	$scope.load_param();
	        	$scope.refreshPosts();
	        },1);
	    };

		//EDITPOST
		$scope.openPost = {}
		$scope.editPost = function(post){
			$scope.openPost = post;
			$scope.openPost.newPost = false;
			//$scope.openSaveModal();
			setTimeout(function(){
				tinymce.activeEditor.setContent($scope.openPost.content.rendered);
			},100);
		};
		
		//DELETEPOSTFUNCTION
		$scope.deletePost = function(index,post){
			if(post.id){
				var deleteConf = confirm('Are you sure you want to delete '+post.title.rendered);
				if(deleteConf){
					$scope.posts.splice(index,1);
					Posts.delete({ID:post.id});
				}
			}
		};
		
		//SAVEPOSTFUNCTION
		$scope.savePost = function(){	
			if($scope.openPost.newPost){
				$scope.openPost.title  =  $scope.openPost.title.rendered;
				$scope.openPost.content  =  $scope.openPost.content.rendered;
				Posts.save($scope.openPost,function(response){
					$scope.openPost = {};
					$scope.refreshPosts();
					$scope.closeSaveModal();
				});
			}else{
				$scope.openPost.title  =  $scope.openPost.title.rendered;
				$scope.openPost.content  =  $scope.openPost.content.rendered;
				Posts.update($scope.openPost,function(res){
					$scope.openPost = {};
					$scope.refreshPosts();
					$scope.closeSaveModal();
				});
			}
		};
		
		//ADDNEWPOST
		$scope.addPost = function(){
			$scope.openPost = {
				newPost:true,
				status:'publish'
			}
		}
		
		//CLEARFORMFUNCTION
		$scope.clear = function(){
			$scope.$root.openPost = false;
			jQuery('#save').modal('hide');
		};
		
		//SAVEMODALOPEN/COSE	
		$scope.openSaveModal = function(){
			jQuery('#save').modal('show');
		}
		
		$scope.closeSaveModal = function(){
			jQuery('#save').modal('hide');
		}
		
		//DATEFUNCTION
		$scope.datify = function(date){
			$scope.date = newDate(date);
			return $scope.date.getDate()+'/'+$scope.date.getMonth()+'/'+$scope.date.getYear();
		};
		
	}])
	
	// single post & page + add comment
	.controller('singleView',['$scope','$http','$stateParams','Comments', 'wp',function($scope,$http,$stateParams,Comments,wp){
		
		console.log('singleView load');

		//render post or page
		wp.renderSingle($stateParams.slug).then(function (response){
	      $scope.post=response.data[0];
	      console.log('renderSingle');
		  console.log($scope);
	    }).catch(function() {
		  console.log('error renderSingle');
		}).finally(function() {
			// if page
			if (!$scope.post) {
				wp.renderSinglePage($stateParams.slug).then(function (response){
	      			$scope.post=response.data[0];
	      			console.log("renderSinglePage");
	      			console.log($scope);
	      		});
			} //end if
		});

		$scope.openComment = {};

		//SAVECOMMENT only for post
		$scope.savecomment = function(){
			$scope.openComment.post = $scope.post.id;
			Comments.save($scope.openComment,function(res){
				if( res.id ) {
					$scope.openComment.post = $scope.post.id;
					//reload post
					wp.renderSingle($stateParams.slug).then(function (response){
				      $scope.post=response.data[0];
				    });
				}
				$scope.openComment = {};
			});
		}
	}])