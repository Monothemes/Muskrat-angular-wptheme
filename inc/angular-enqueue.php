<?php

class angular_enqueue {
	
	function init() {
		
		add_action( 'wp_enqueue_scripts', array( $this, 'angular_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'angular_styles' ) );
		
	}
	
	function angular_scripts() {
		
		wp_enqueue_script( 'angular_core', get_template_directory_uri().'/assets/js/angular.min.js', array( 'jquery' ), null, false );
		wp_enqueue_script( 'bootstrap-js', get_template_directory_uri().'/assets/js/bootstrap.js', array( 'jquery' ), null, false );
		wp_enqueue_script( 'angular_theme', get_template_directory_uri().'/assets/js/scripts.js', array( 'angular_core' ), null, false );
		
		// // // app js
		// wp_enqueue_script( 'angular_theme', get_template_directory_uri().'/src/js/app.js', array( 'angular_core' ), null, false );
		// wp_enqueue_script( 'angular_controller', get_template_directory_uri().'/src/js/app.controller.js', array( 'angular_core' ), null, false );
		// wp_enqueue_script( 'angular_service', get_template_directory_uri().'/src/js/app.factory.js', array( 'angular_core' ), null, false );
		// wp_enqueue_script( 'angular_filter', get_template_directory_uri().'/src/js/app.filter.js', array( 'angular_core' ), null, false );
		// wp_enqueue_script( 'angular_directive', get_template_directory_uri().'/src/js/app.directive.js', array( 'angular_core' ), null, false );
		// //other js
		// wp_enqueue_script( 'modernizr-js', get_template_directory_uri().'/src/js/modernizr.js', array( 'angular_core' ), null, false );
		

		wp_localize_script( 'angular_theme', 'ajaxInfo',
			array(
				
				'api_url'			 => rest_get_url_prefix() . '/wp/v2/',
				'template_directory' => get_template_directory_uri() . '/',
				'nonce'				 => wp_create_nonce( 'wp_rest' ),
				'is_admin'			 => current_user_can('administrator'),
				'posts_per_page'	 => get_option('posts_per_page '),
				// 'post_types'         => get_post_types(array('public' => true), 'objects'),
				// 'taxonomies'         => get_taxonomies(array('public' => true), 'objects')
				
			)
		);
		
	}
	
	function angular_styles() {
		
		wp_enqueue_style( 'angularStyles', get_template_directory_uri().'/assets/css/styles.css', array(), null, 'all' );
		
	}
	
}	
	
	
?>