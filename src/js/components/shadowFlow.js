var ShadowFlow = {

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

  initEvents: function() {
    var self = this;
    window.addEventListener("mousemove", self.updateAll.bind(this))
  },

  init: function() {
    this.elements = document.querySelectorAll(".shadow-flow");
    this.initEvents();
  }
}



export default ShadowFlow;