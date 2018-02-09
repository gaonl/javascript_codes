var __timeOut = null;
var __lazyLoadCache = [];
var __loading = function() {
	var st = $(window).scrollTop();
	var sth = st + $(window).height();
	$.each(__lazyLoadCache, function(i, data) {
		var o = data.obj;
		var tag = data.tag;
		var url = data.url;
		if (o) {
			post = o.position().top; 
			posb = post + o.height();
			if ( !(posb < st || post > sth) ) {
				if (tag === "img") {
					o.attr("src", url);	
				} else {
					o.load(url);
				}	
				data.obj = null;		
			}
		}
	});		
	return false;	
};
		
		
(function($) {
	$.fn.scrollLoading = function(options) {
		var defaults = {
			attr: "data-url"	
		};
		var params = $.extend({}, defaults, options || {});
		$(this).each(function() {
			var node = this.nodeName.toLowerCase();
			var url = $(this).attr(params["attr"]);
			if (!url) { return; }
			var data = {
				obj: $(this),
				tag: node,
				url: url
			};
			__lazyLoadCache.push(data);
		});
		
		__loading();
		
		$(window).bind("scroll", function(){
			if(__timeOut){
				clearTimeout(__timeOut);
			}
			var timeLazy = params.timeLazy?params.timeLazy:300;
			__timeOut = setTimeout(__loading,timeLazy);
		});
	};
})(jQuery);