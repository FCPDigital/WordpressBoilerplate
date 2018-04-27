import Carousel from "./components/carousel.js";
import Thumbnails from "./components/thumbnails.js";
import TogglerManager from "./components/toggler.js";
import {Toggler} from "./components/toggler.js";
import BackgroundParalax from "./components/backgroundParalax.js";
import ShadowFlow from "./components/shadowFlow.js";

var offsetTop = function(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};

Object.defineProperties(window, {
    scrollTop: {
        get: function() {
            return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        },
        set: function(value) {
            var scrollTop = ((document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop);
            scrollTop = value;
        }
    }
});

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