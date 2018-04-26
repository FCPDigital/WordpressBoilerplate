<?php
/**
 * The template for displaying all single posts and attachments
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

get_header(); ?>


<section class="single">
	
	<?php
	// Start the loop.
	while ( have_posts() ) : the_post();
	
			// Include the page content template.
			get_template_part( 'content/content', 'page' );

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;
	
	// End the loop.
	endwhile;
	?>

</section>

<?php get_footer(); ?>
