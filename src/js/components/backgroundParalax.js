import requestAnimationFrame from "./../utils/raf.js"

var BackgroundParalax = {

  update: function(element, event) {
    var position = offsetTop(element);
    position.left += element.offsetWidth/2;
    position.top += element.offsetHeight/2;

    var intensity = {
      left: (position.left - event.clientX) / 150,
      top: (position.top - event.clientY) / 100 
    }
    
    element.style.textShadow = intensity.left + "px " + intensity.top + "px 10px rgba(0, 0, 0, .5)" 
  },

  updateAll: function(event){
    for(var i=0; i<this.elements.length; i++) {
      this.update(this.elements[i], event)
    }
  },

  initEvent: function(element) {
    var image = new Image();
    image.src = element.style.backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1];

    var ratio = element.offsetWidth / element.offsetHeight;
    var bgRatio = image.width/image.height;
    var value = {left: 0, top: 0}
    var targetValue = {left: 0, top: 0}
    var animate = false;

    var raf = function(){
      value = {
        left: value.left + (targetValue.left - value.left)*0.1,
        top: value.top + (targetValue.top - value.top)*0.1
      }

      element.style.backgroundPosition = (50 + ease(value.left)*2) + "%" + (50 + ease(value.top)*2) + "%";

      if( Math.abs(value.left - targetValue.left) < 0.001 && Math.abs(value.top - targetValue.top) < 0.001 ) {
        animate = false
        return;
      }

      requestAnimationFrame(raf);
    }

    var start = function(){
      if(animate){
        return; 
      }
      animate = true; 
      requestAnimationFrame(raf);
    }

    function ease(t) {
      return -t * (t - 2.0);
    }

    window.addEventListener("resize", function() {
      ratio = element.offsetWidth / element.offsetHeight;
    })

    element.addEventListener("mousemove", function(e) {
      var scale = 1.3;
      var size = ratio > bgRatio ? "130% auto" : "auto 130%"  
            
      targetValue = {
        left: (e.clientX - element.offsetWidth/2) / (element.offsetWidth/2),
        top: (e.clientY + window.scrollTop - element.offsetHeight/2) / (element.offsetHeight/2)
      }
    
      element.style.backgroundSize = size
      start();
      //requestAnimationFrame(raf);
    })

    raf();
  },

  initEvents: function() {
    var self = this;
    for(var i=0; i<this.elements.length; i++) {
      this.initEvent(this.elements[i]);
    }
  },


  init: function() {
    this.elements = document.querySelectorAll(".paralax");
    this.initEvents();
  }
}

export default BackgroundParalax;