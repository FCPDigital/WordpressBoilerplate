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

export {offsetTop};