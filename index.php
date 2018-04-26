<?php
/**
 * The main template file
 */

get_header(); ?>

<section class="home">

	<?php if ( have_posts() ) : ?>

		<?php if ( is_home() && ! is_front_page() ) : ?>
			<div class="home__title-container">
				<h1 class="home__title title"><?php single_post_title(); ?></h1>
			</div>
		<?php endif; ?>

		<?php
		// Main Loop
		while ( have_posts() ) : the_post();
			get_template_part( 'content', get_post_format() );
		endwhile;

		// Pagination
		the_posts_pagination( array(
			'prev_text'          => "<",
			'next_text'          => ">",
			'before_page_number' => "Page ",
		) );

	// No content
	else :
		get_template_part( 'content/content', 'none' );
	endif;
	?>

</section>

<?php get_footer(); ?>
