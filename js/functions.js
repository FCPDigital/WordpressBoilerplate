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


function Toggler(element) {
	this.element = element;
	this.getTargets();
	this.initEvents();
}

Toggler.prototype = {

	getTargets: function() {
		this.selectors = this.element.getAttribute("data-toggle-target").split(/,\s?/);
		this.modifiers = this.element.getAttribute("data-toggle-modifier").split(/,\s?/);
		this.targets = [];
		for(var i=0; i<this.selectors.length; i++) {
			this.targets.push(document.querySelector(this.selectors[i]));
			if( !this.modifiers[i] ) {
				this.modifiers[i] = "hidden";
			}
		}
	},

	toggle: function(){
		for(var i=0; i<this.targets.length; i++) {
			this.targets[i].classList.toggle(this.modifiers[i])
		}
	},

	initEvents: function() {
		var self = this;
		this.element.addEventListener("click", function(e){
			self.toggle();
			e.preventDefault();
		})
	}
}

var TogglerManager = {

	togglers: [],

	findByElement: function(element) {
		for(var i=0; i<this.togglers.length; i++) {
			if(this.togglers[i].element === element) {
				return this.togglers[i]
			}
		}
	},
	
	init: function() {
		var elements = document.querySelectorAll("*[data-toggle-target]");
		for(var i=0; i<elements.length; i++) {
			this.togglers.push(new Toggler(elements[i]));
		}
	}
} 


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

window.addEventListener("load", function(){
	manageHomeCarousel();
	TogglerManager.init();
	BackgroundParalax.init();
	ShadowFlow.init();
})