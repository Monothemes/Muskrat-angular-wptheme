'use strict';

angular.module('wpAngularTheme')
  
  .factory('Posts',function($resource){

    return $resource(ajaxInfo.api_url+'posts/:ID',{
      ID:'@id'
    },{
      'update':{
        method:'PUT',
        headers: {
          'X-WP-Nonce': ajaxInfo.nonce
        }
      },
      'post':{
        method:'POST',
        headers: {
          'X-WP-Nonce': ajaxInfo.nonce
        }
      },
      'save':{
        method:'POST',
        headers: {
          'X-WP-Nonce': ajaxInfo.nonce
        }
      },
      'delete':{
        method:'DELETE',
        headers: {
          'X-WP-Nonce': ajaxInfo.nonce
        }
      }
    });
  })

  .factory('Comments',function($resource){
    return $resource(ajaxInfo.api_url+':ID/comments',{
      ID:'@id'
    },{
      'update':{method:'PUT'},
      'save':{
        method:'POST',
        headers: {
          'X-WP-Nonce': ajaxInfo.nonce
        }
      }
    });
  })

  .factory('wp', function ($q,$http) {
    console.log('wp factory load');
 
    var wp={
      //pageTitle: '',
    };

    // Helpers
    function _updateTitle( documentTitle ) {
        document.querySelector( '.page-header' ).innerHTML = documentTitle;
        //wp.pageTitle = pageTitle;
    }

      // wp.getCategories =  function() {
      //   return $http.get(ajaxInfo.api_url + 'categories/');
      // };
      // wp.getTags =  function() {
      //   return $http.get(ajaxInfo.api_url + 'tags/');
      // };
      wp.getPostinTags =  function(tags) {
        _updateTitle('Tag: ' + tags );  
        return $http.get(ajaxInfo.api_url + 'posts/?filter[tag]=' + tags);
      };
      wp.navMenus = function($menu_locations) {
        return $http.get('wp-json/wp-api-menus/v2/menu-locations/'+ $menu_locations);
      }
      wp.getSidebar = function($sidebar_id) {
        return $http.get('wp-json/wp-rest-api-sidebars/v1/sidebars/'+ $sidebar_id);
      }
      wp.renderSingle = function($slug) {
          return $http.get( ajaxInfo.api_url + 'posts?filter[name]=' + $slug )
      }
      wp.renderSinglePage = function($slug) {
          return $http.get( ajaxInfo.api_url + 'pages?filter[name]=' + $slug )
      }
      wp.getPostinAuthor = function($author_name) {
           _updateTitle('Author: ' + $author_name ); 
          return $http.get( ajaxInfo.api_url + 'posts?filter[author_name]=' + $author_name )
      }
      wp.getPostsInCategory = function( category ) {
        console.log( 'getPostsInCategory called' );
          //pageId = ( ! pageId ) ? 1 : parseInt( pageId, 10 );
          var request = ajaxInfo.api_url + 'posts/?filter[category_name]=' + category;
           _updateTitle('Category: ' + category );  
            // if ( pageId ) {
            //   request += '&page=' +pageId;
            // }
          return $http.get( request );
      }
      // wp.Comments = function($resource){
      //   return $resource(ajaxInfo.api_url+':ID/comments',{
      //     ID:'@id'
      //   },{
      //     'update':{method:'PUT'},
      //     'save':{
      //       method:'POST',
      //       headers: {
      //         'X-WP-Nonce': ajaxInfo.nonce
      //       }
      //     }
      //   });
      // }

    return wp;
  });


