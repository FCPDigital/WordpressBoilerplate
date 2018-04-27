
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


    function ease(t) {
      return -t * (t - 2.0);
    }

    window.addEventListener("resize", function() {
      ratio = element.offsetWidth / element.offsetHeight;
    })

    element.addEventListener("mousemove", function(e) {
      var scale = 1.3;
      var size = ratio > bgRatio ? "130% auto" : "auto 130%"  
            
      var value = {
        left: (e.clientX - element.offsetWidth/2) / (element.offsetWidth/2),
        top: (e.clientY + window.scrollTop - element.offsetHeight/2) / (element.offsetHeight/2)
      }
      


      element.style.backgroundSize = size
      element.style.backgroundPosition = (50 + ease(value.left)*1) + "%" + (50 + ease(value.top)*1) + "%";
    })
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