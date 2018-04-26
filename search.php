<?php
/**
 * The template for displaying search results pages.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

get_header(); ?>

<section class="search">
	
	<?php if ( have_posts() ) : ?>

	<div class="search__header">
		<h1 class="search__title title-1"><?php printf( __( 'Search Results for: %s', 'twentyfifteen' ), get_search_query() ); ?></h1>
	</div>
	
	<div class="search__body wrapper">
	<?php
		// Start the loop.
		while ( have_posts() ) : the_post(); ?>

			<?php
			/*
			* Run the loop for the search to output the results.
			* If you want to overload this in a child theme then include a file
			* called content-search.php and that will be used instead.
			*/
			get_template_part( 'content/content', 'search' );

		// End the loop.
		endwhile;

		// Previous/next page navigation.
		the_posts_pagination( array(
			'prev_text'          => __( 'Previous page', 'twentyfifteen' ),
			'next_text'          => __( 'Next page', 'twentyfifteen' ),
			'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'twentyfifteen' ) . ' </span>',
		) );

		// If no content, include the "No posts found" template.
		else :
		get_template_part( 'content/content', 'none' );
		endif;
	?>
	</div>

</section>

<?php get_footer(); ?>
