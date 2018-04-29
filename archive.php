<?php
/**
 * The template for displaying archive pages
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * If you'd like to further customize these archive views, you may create a
 * new template file for each one. For example, tag.php (Tag archives),
 * category.php (Category archives), author.php (Author archives), etc.
 */

get_header(); ?>




<section class="archive">

	<div class="archive__header section center-y min-h-big">
		<?php 
		the_archive_title( '<h1 class="title-1 archive__title">', '</h1>' ); 
		the_archive_description( '<div class="taxonomy-description archive__description">', '</div>' );
		?>
	</div>

	<div  class="archive__body wrapper">
		
	<?php if ( have_posts() ) : 

		// Start the Loop.
		while ( have_posts() ) : the_post();

			 /*
				* Include the Post-Format-specific template for the content.
				* If you want to override this in a child theme, then include a file
				* called content-___.php (where ___ is the Post Format name) and that will be used instead.
				*/
			get_template_part( 'content/miniatures/content', get_post_format() );

		// End the loop.
		endwhile;

		// Previous/next page navigation.
		the_posts_pagination( array(
			'prev_text'          => __( '<', 'twentyfifteen' ),
			'next_text'          => __( '>', 'twentyfifteen' ),
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
