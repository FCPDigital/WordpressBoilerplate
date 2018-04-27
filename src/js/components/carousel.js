function Carousel(element) {
  this.element = element;
  this.headItems = this.element.querySelectorAll(".carousel__header-item");
  this.items = this.element.querySelectorAll(".carousel__body-item"); 
  this._current = 0;
  this.initEvents();
}

Carousel.prototype = {
  get current() {
    if( this._current >= 0 ) {
      return this._current;
    }
    for(var i=0; i<this.headItems.length; i++) {
      if( this.headItems[i].classList.contains("carousel__header-item--active") ) {
        return i;
      }
    }
    this.current = 0; 
    return 0; 
  },

  set current(value) {
    if( value !== this.current ) {
      this.hide(this.current);
      setTimeout((function(){
        this.show(value);
      }).bind(this), 350)
    }
    var last = this._current; 
    this._current = value;
    this.onChange.call(this, this.items[this.current], this.items[last], this.current);
  },

  getHead: function(rank){
    return this.headItems[rank];
  },

  getBody: function(rank){
    return this.items[rank];
  },

  hide: function(rank) {
    this.headItems[rank].classList.remove("carousel__header-item--active");
    this.items[rank].classList.replace("carousel__body-item--visible", "carousel__body-item--hidding");
    setTimeout((function(){
      this.items[rank].classList.replace("carousel__body-item--hidding", "carousel__body-item--hidden");
    }).bind(this), 350)
  },

  show: function(rank) {
    this.headItems[rank].classList.add("carousel__header-item--active");
    this.items[rank].classList.replace("carousel__body-item--hidden", "carousel__body-item--hidding");
    this.items[rank].classList.replace("carousel__body-item--hidding", "carousel__body-item--visible");
  },

  initHeadEvent: function(element, rank) {
    var self = this;
    element.addEventListener("click", function(e){
      self.current = rank;
      e.preventDefault();
    })
  },

  initEvents: function() {
    for(var i=0; i<this.headItems.length; i++) {
      this.initHeadEvent(this.headItems[i], i);
    }
  },

  onChange: function(callback) {
    this.onChange = callback;
  }
}

export default Carousel;