<?php 
/* 
Template Name: Page d'accueil 
*/ 
get_header(); 
$base_post = get_post();
?>

<section class="home">
    <div id="anchor-1" class="section center-y min-h-window paralax" style="background-image: url('<?php echo get_field("image_1"); ?>');">
        <h2 class="title-1 mb-5 ml-2 mr-2 shadow-flow"><?php echo get_the_title(); ?></h2>
        <a href="#anchor-2" class="scroll-btn"></a>
    </div>

    <?php while ( have_posts() ) : the_post(); ?>

    <div id="anchor-2" class="section section--top-bg section--pad-big">
        
        <div class="wrapper">
            <?php if ( get_field("subtitle") ) { ?>
                <h2 class="title-2"><?php echo get_field("subtitle"); ?></h2>
            <?php } ?>
            
            <div id="home-carousel" class="carousel">
                <div class="carousel__header">
                    <?php 
                    
                    $loop = new WP_Query(array( 'category_name' => 'etapes', 'post_status' => 'publish', 'orderby' => 'date',
                    'order' => 'ASC', )); 
                    $count = 0;

                    while ( $loop->have_posts() ) : $loop->the_post(); $count++ ?>
                        
                        <a href="#" class="carousel__header-item <?php if($count === 1) { echo "carousel__header-item--active"; }?>" data-carousel-target="carousel-item-<?php the_ID(); ?>">
                            <p class="title-3"><?php echo $count; ?>.</p>
                            <p class="color-primary text-center"><?php echo get_the_title(); ?></p>
                        </a>

                    <?php 
                    endwhile; 
                    $loop->rewind_posts();
                    ?>
                
                </div>
                <div class="carousel__body">
                    <?php 
                    $count = 0;
                    while ( $loop->have_posts() ) : $loop->the_post(); $count++ ?>
                        
                        <div id="carousel-item-<?php the_ID(); ?>" class="carousel__body-item <?php if($count !== 1): echo "carousel__body-item--hidden"; else: echo "carousel__body-item--visible"; endif; ?>">
                            <p class="title-3 mb-3"><?php echo $count; ?>. <?php echo get_the_title(); ?></p>
                            <div class="text-center article">
                               <?php the_field("head"); ?>
                            </div>
                            <div class="text-center mt-3">
                                <a id="toggler-<?php the_ID(); ?>" href="/async-content/<?php the_ID(); ?>" data-toggle-target="#content-<?php the_ID(); ?>, #toggler-<?php the_ID(); ?>" data-toggle-modifier="animate-height--hidden, btn-morph-cross--active" class="btn btn-morph-cross">En savoir plus</a>
                            </div>
                            <div id="content-<?php the_ID(); ?>" class="animate-height animate-height--hidden">
                                <div class="article article--card">
                                    <?php the_content(); ?>
                                </div>
                            </div>
                        </div>

                    <?php
                    endwhile; 
                    $loop->rewind_posts();
                    ?>
                
                </div><!-- Carousel Body -->
            </div><!-- Carousel -->
        </div><!-- Wrapper -->

        <div class="thumbnails">

            <?php 
            $count = 0;
            while ( $loop->have_posts() ) : $loop->the_post(); $count++ ?>
                
                <img 
                id="thumbnail-<?php the_ID(); ?>" 
                class="thumbnail <?php if($count == 1) : echo "thumbnail--visible"; else: echo "thumbnail--hidden"; endif; ?>" 
                src="<?php echo get_the_post_thumbnail_url(); ?>" 
                alt="<?php echo get_the_title(); ?>">

            <?php endwhile; ?>
        </div>

    </div>

    <div id="anchor-3" class="section min-h-window center-y">
        <?php $post = $base_post; ?>
        <?php if ( get_field("subtitle-2") ) { ?>
            <h2 class="title-2"><?php echo get_field("subtitle-2"); ?></h2>
        <?php } ?>
        
        <div class="article">
            <?php echo $post->post_content; ?>
        </div>
    </div>

    <div id="anchor-4" class="section bg-color-secondary">
        <div class="article">
            <div class="center-x article">
                <?php echo get_field("additionnal_content"); ?>
            </div>
        </div>
    </div>

    <?php endwhile; ?>
</section>


<?php 
get_footer(); 
?>