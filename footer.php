<?php ?>

</main><!-- .site-content -->

<footer class="footer <?php if(!is_home()){ echo "footer--light"; } ?>">
	<div class="grid">
		<div class="col-s-1-2">
			<?php 
			dynamic_sidebar( "footer-1" ); 
			?>
		</div>
		<div class="col-s-1-2">
			<?php 
			dynamic_sidebar( "footer-2" ); 
			?>
		</div>
	</div>
	<div class="clear"></div>
	<div class="mt-4">
	<p class="text-center">© Copyright Jérôme Foucaud, Tout droits Réservés. Assemblé par <a href="http://fcp-digital.com/">FCP Digital</a></p>
	</div>
</footer>

<?php wp_footer(); ?>

</body>
</html>
