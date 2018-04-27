<?php

//* Contrôle si Advanced Custom Field est actif sur le site
if ( ! function_exists( 'get_field' ) ) {
	// Variable pour URL de la page Extension
	$no_acf_plugin_url = get_bloginfo('url') . '/wp-admin/plugins.php';
	// Notice dans le back-office au moment de la désactivation
	add_action('admin_notices','gn_warning_admin_missing_acf');
	function gn_warning_admin_missing_acf() {
       global $no_acf_plugin_url;
	   $output = '<div id="my-custom-warning" class="error fade">';
	   $output .= sprintf('<p><strong>Attention</strong>, ce site ne fonctionne pas sans l\'extension <strong>Advanced Custom Fields</strong>. Merci d\'activer cette <a href="%s">extension</a>.</p>', $no_acf_plugin_url);
	   $output .= '</div>';
	   echo $output;
	 }
	 
	// Notice dans le front qui masque tout le contenu et affiche le lien pour ce connecter
	add_action( 'template_redirect', 'gn_template_redirect_warning_missing_acf', 0 );
	function gn_template_redirect_warning_missing_acf() {
		global $no_acf_plugin_url;
		wp_die( sprintf( 'Ce site ne fonctionne pas sans l\'extension <strong>Advanced Custom Fields</strong>. Merci <a href="%s">d\'activer l\'extension</a>.', $no_acf_plugin_url ) );
	}
}



if(function_exists("register_field_group"))
{
	register_field_group(array (
		'id' => 'acf_homepage',
		'title' => 'homepage',
		'fields' => array (
			array (
				'key' => 'field_5adf2a0e351bb',
				'label' => 'Image 1',
				'name' => 'image_1',
				'type' => 'image',
				'instructions' => 'Correspond à l\'image principale situé tout en haut de la page',
				'save_format' => 'url',
				'preview_size' => 'full',
				'library' => 'all',
			),
			array (
				'key' => 'field_5ae1cb9d68186',
				'label' => 'Sous titre',
				'name' => 'subtitle',
				'type' => 'text',
				'instructions' => 'Titre de la section 2',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5ae1cb9d68188',
				'label' => 'Sous titre 2',
				'name' => 'subtitle-2',
				'type' => 'text',
				'instructions' => 'Titre de la section 3',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5ae1cbbf68187',
				'label' => 'Bloc additionnel',
				'name' => 'additionnal_content',
				'type' => 'wysiwyg',
				'instructions' => 'Bloc de couleur dans le quel placé un texte',
				'default_value' => '',
				'toolbar' => 'full',
				'media_upload' => 'yes',
			)
		),
		'location' => array (
			array (
				array (
					'param' => 'page_template',
					'operator' => '==',
					'value' => 'template-home.php',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'normal',
			'layout' => 'no_box',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
}


add_action( 'widgets_init', 'footer_widgets_init' );
function footer_widgets_init() {
    register_sidebar( array(
        'name' => __( 'Footer 1', 'footer-1' ),
        'id' => 'footer-1',
        'description' => "Colonne de gauche du footer",
        'before_widget' => '<div id="%1$s" class="footer__widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="title-4 text-center">',
		'after_title'   => '</h3>',
	) );
	
	register_sidebar( array(
        'name' => __( 'Footer 2', 'footer-2' ),
        'id' => 'footer-2',
        'description' => "Colonne de droite du footer",
        'before_widget' => '<div id="%1$s" class="footer__widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="title-4">',
		'after_title'   => '</h3>',
    ) );
}

function theme_setup() {

	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 825, 510, true );
	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu',      'twentyfifteen' ),
		'social'  => __( 'Social Links Menu', 'twentyfifteen' ),
	) );
	add_theme_support( 'post-formats', array(
		'aside', 'image', 'video', 'quote', 'link', 'gallery', 'status', 'audio', 'chat'
	) );

}

add_action( 'after_setup_theme', 'theme_setup' );


function theme_scripts() {

	// Load our main stylesheet.
	wp_enqueue_style( 'twentyfifteen-style', get_stylesheet_uri() );
	wp_enqueue_script( 'twentyfifteen-script', get_template_directory_uri() . '/js/functions.js', array( 'jquery' ), '20150330', true );

}
add_action( 'wp_enqueue_scripts', 'theme_scripts' );




function the_burger() {
	echo '
	<svg id="Layer_1"
	data-name="Layer 1"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 34.28 23.67"
	class="header__menu-img">
	<title>burger</title>
	<rect class="rect-1" width="29" height="5" rx="2.5" ry="2.5" fill="#293d60"/>
	<rect class="rect-2" y="9.33" width="21" height="5" rx="2.5" ry="2.5" fill="#293d60"/>
	<rect class="rect-3" y="18.67" width="34" height="5" rx="2.5" ry="2.5" fill="#293d60"/>
	</svg>';
}


/******************* SHORTCODE ********************/

function button_shortcode( $atts, $content ){
	$a = shortcode_atts( array(
        'href' => null,
        'class' => '',
        'id' => '',
        'center' => false,
        'content' => "Envoyer"
  ), $atts );

	$content = "";

	if($a['center']){
		$content .="<div class='center-x'>";
	}
	if($a['href']){
		$content .= "<a href='".$a['href']."' class='btn ".$a['class']."' id='".$a["id"]."'>".$a["content"]."</a>";
	} else {
		$content .= "<button class='btn ".$a['class']."' id='".$a["id"]."'>".$a["content"]."</button>";
	}

	if($a['center']){
		$content.= "</div>";
	}

	return $content;
}


add_shortcode( 'button', 'button_shortcode' );
