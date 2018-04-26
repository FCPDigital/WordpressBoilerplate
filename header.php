<?php
/**
 * The template for displaying the header
 * Displays all of the head element and everything up until the "site-content" div.
 */
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<header class="header header--center">
	<div class="header__block header__left">
		<button class="header__menu" data-toggle-target="#main-menu" data-toggle-modifier="menu--hidden">
			<?php the_burger(); ?>
			<p class="header__menu-label">Menu</p>
		</button>
	</div>
	<div class="header__brand header__block--center">
	<?php 
		$custom_logo_id = get_theme_mod( 'custom_logo' );
		$image = wp_get_attachment_image_src( $custom_logo_id , 'full' ); ?>
		<a href="<?php echo get_site_url(); ?>"> <img class="header__brand-img" src="<?php echo $image[0]; ?>" alt=""> </a>
		
	</div>
</header>

<div id="main-menu" class="menu menu--hidden">
	<button class="menu__close" id="" data-toggle-target="#main-menu" data-toggle-modifier="menu--hidden">Close</button>
	<div class="menu__brand">
		<img class="menu__brand-img" src="<?php echo get_template_directory_uri(); ?>/ressources/assets/logo-blanc.png"	 alt="">
	</div>
	<?php 
	wp_nav_menu( array(
		'menu_class'     => 'menu__main',
		'theme_location' => 'primary',
	) );
	?>
</div>

<main class="main">
