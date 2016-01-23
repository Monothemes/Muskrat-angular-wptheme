<?php

// require 'inc/custom-routes.php';
// require 'inc/angular-enqueue.php';

$anunang_includes = [
  'inc/custom-routes.php',
  'inc/angular-enqueue.php',
  // 'inc/scripts.php',
  // 'inc/cpt.php',
  // 'inc/extras.php',
  // 'inc/api.php',
  // 'inc/setup.php',
];

foreach ($anunang_includes as $file) {
  if (!$filepath = locate_template($file)) {
    trigger_error(sprintf(__('Error locating %s for inclusion', 'anunang'), $file), E_USER_ERROR);
  }

  require_once $filepath;
}
unset($file, $filepath);




class angularjs_wp_theme {
	
	function init() {
		
		add_action( 'init', array( $this, 'register_muskrat_menus' ) );
		add_action( 'init', array( $this, 'register_muskrat_sidebar' ) );
		add_action( 'after_setup_theme', array( $this, 'add_awesome_theme_support' ) );
		add_action( 'admin_init', array( $this, 'apiCheck' ) );
		
		$angularScripts = new angular_enqueue();
		$angularScripts->init();
		
		$ang_routes = new angular_theme_routes();
		$ang_routes->__init();
		
	}

	/* Check install plugin */
	function apiCheck(){
		if ( !class_exists( 'WP_REST_Response' ) ) {
		  add_action( 'admin_notices', array( $this, 'apiError' ) );
		} 
		if ( !class_exists( 'ACF_To_REST_API' ) ) {
		  add_action( 'admin_notices', array( $this, 'apiErrorACF' ) );
		}
		if ( !class_exists( 'WP_REST_Menus' ) ) {
		  add_action( 'admin_notices', array( $this, 'apiErrorMenus' ) );
		}  
	}
	function apiError(){
		echo '<div class="error"><p><strong>JSON REST API</strong> must be installed and activated for this theme to work properly</p></div>';
	}
	function apiErrorACF(){
		echo '<div class="error"><p><strong>ACF_To_REST_API</strong> must be installed and activated for this theme to work properly</p></div>';
	}
	function apiErrorMenus(){
		echo '<div class="error"><p><strong>WP REST API Menus</strong> must be installed and activated for this theme to work properly</p></div>';
	}

	/* THEME SUPPORT */
	function add_awesome_theme_support(){
		
		add_theme_support( 'post-thumbnails' );
		add_post_type_support( 'page', 'excerpt' );
		
	}

	// REGISTER MENUS
	function register_muskrat_menus() {
		
	  register_nav_menus(
	    array(
	      'header-menu' => __( 'Header Menu' ),
	      'footer-menu' => __( 'Footer Menu' )
	    )
	  );
	  
	}

	//REGISTER SIDEBAR
	function register_muskrat_sidebar() {
		
		register_sidebar(array(
			'name' 			=> 'Right Side',
			'id' 			=> 'right-sidebar',
			'before_widget' => '<section>',
			'after_widget' 	=> '</section>',
			'before_title' 	=> '<h4>',
			'after_title' 	=> '</h4>'
		));
		
	}



}

$angularJStheme = new angularjs_wp_theme();
$angularJStheme->init();

?>