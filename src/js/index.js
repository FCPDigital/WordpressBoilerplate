import Carousel from "./components/carousel.js";
import Thumbnails from "./components/thumbnails.js";
import TogglerManager from "./components/toggler.js";
import {Toggler} from "./components/toggler.js";
import BackgroundParalax from "./components/backgroundParalax.js";
import ShadowFlow from "./components/shadowFlow.js";



function manageHomeCarousel(){
  if (document.querySelector("#home-carousel")) {
    var sectionCarousel = document.querySelector("#anchor-2");

    var thumbnails = new Thumbnails(sectionCarousel.querySelector(".thumbnails"));
    var carousel = new Carousel(document.querySelector("#home-carousel"));
    carousel.onChange = function(current, last, rank) {
      //last.querySelector(".btn-morph-cross").click();
      var toggler = TogglerManager.findByElement(last.querySelector(".btn-morph-cross"));
      if( toggler && toggler.element.classList.contains("btn-morph-cross--active") ) {
        toggler.toggle();
      }
      thumbnails.current = rank;
    }
  }
}


window.addEventListener("load", function(){
  manageHomeCarousel();
  TogglerManager.init();
  BackgroundParalax.init();
  ShadowFlow.init();
})