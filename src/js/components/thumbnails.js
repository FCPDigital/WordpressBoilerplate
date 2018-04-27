function Thumbnails(element) {
  this.element = element;
  this.items = element.querySelectorAll(".thumbnail");
  this._current = null;
}

Thumbnails.prototype = {

  get current(){
    if( this._current >= 0 ){
      return this._current;
    }
    this.current = 0; 
    return 0; 
  },

  set current(value) {
    if( this._current ) {
      this.hide(this.current);
    } 

    this.show(value);
    this._current = value;
  },

  hide: function(rank) {
    this.items[rank].classList.replace("thumbnail--visible", "thumbnail--hidden");
  },
 
  show: function(rank) {
    this.items[rank].classList.replace("thumbnail--hidden", "thumbnail--visible");
  }
}


export default Thumbnails;