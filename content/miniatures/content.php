<div class="miniature archive__item">

  <img src="<?php echo get_the_post_thumbnail_url(); ?>" class="miniature__thumbnail" alt="">

  <div id="miniature-header-<?php the_ID(); ?>" class="miniature__header center-y">
    <h1 class="miniature__title"><?php echo get_the_title(); ?></h1>
  </div>

  <div id="miniature-body-<?php the_ID(); ?>" class="miniature__body <?php post_class(); ?>">
    <?php the_excerpt(); ?>
  </div>

</div>
