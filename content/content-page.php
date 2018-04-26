<?php
/**
 * The template used for displaying page content
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */
?>


<div id="page-header-<?php the_ID(); ?>" class="page__header section center-y min-h-big" style="background-image: url('<?php echo get_the_post_thumbnail_url(); ?>');">
	<h1 class="title-1 shadow-flow"><?php echo get_the_title(); ?></h1>
</div>

<div id="page-body-<?php the_ID(); ?>" class="page__body wrapper <?php post_class(); ?>">
	

	<article class="article mt-4 mb-4">
		<?php the_content(); ?>
			

		<?php edit_post_link( __( 'Edit', 'twentyfifteen' ), '<footer class="entry-footer"><span class="edit-link">', '</span></footer><!-- .entry-footer -->' ); ?>

	</article><!-- #post-## -->

	<div class="pagination">
	<?php
		wp_link_pages( array(
			'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'twentyfifteen' ) . '</span>',
			'after'       => '</div>',
			'link_before' => '<span>',
			'link_after'  => '</span>',
			'pagelink'    => '<span class="screen-reader-text">' . __( 'Page', 'twentyfifteen' ) . ' </span>%',
			'separator'   => '<span class="screen-reader-text">, </span>',
		) );
	?>
	</div>

</div>