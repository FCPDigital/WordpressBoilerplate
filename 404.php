<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

get_header(); ?>

<section class="error-404 min-h-window center-y">
	<div class="error-404__header">
		<h1 class="error-404__title title-2">Erreur 404</h1>
		<p class="error-404__subtitle text-center">Page introuvable</p>
	</div>

	<div class="error-404__search center-x">
		<div>
			<?php get_search_form(); ?>
		</div>
	</div>
	
</section>

<?php get_footer(); ?>
