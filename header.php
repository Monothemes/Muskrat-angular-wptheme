<!DOCTYPE html>
<html ng-app="wpAngularTheme">

<head>
	<base href="/">

  	<title><?php wp_title('&laquo;', true, 'right'); ?> <?php bloginfo('name'); ?></title>
  	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
   	<?php wp_head();?>

    <!--[if lt IE 9]>
	    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />	

</head>

<body <?php body_class(); ?>>

	<!-- navigate html -->
	<navigation></navigation>
  <!-- <nav-menu location="header-menu"></nav-menu> -->

    <!-- Page Content -->
    <div class="container">

        <div class="row">