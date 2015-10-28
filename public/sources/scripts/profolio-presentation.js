'use strict';

// dom ready
$(function(){
        var scrolling = false;
  var lastPos = 0;

	var profolio = profolio || {
	  $section: $(document.querySelector('#profolios-section')), // 作品集 section
    method: {
      showProfolios: function(firstProfolio) {
				if(!firstProfolio.length)
					return;

				setTimeout(function(){
					firstProfolio.addClass('loaded');
					profolio.method.showProfolios(firstProfolio.next());
				}, 150);
			},
      openProfolio: function(thisProfolio) {
				profolio.$section.addClass('opening');
				thisProfolio.addClass('inside').siblings('li').removeClass('loaded');
    	},
      closeProfolio: function(thisProfolio) {
				var mq = window.getComputedStyle(document.querySelector('.profolios-section'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, ""),
						delay = ( mq == 'mobile' ) ? 100 : 0; //check media query

				profolio.$section.removeClass('opening');
				// fade out this profolio
				thisProfolio.animate({opacity: 0}, 500, function(){
					thisProfolio.removeClass('loaded');
					profolio.$section.find('.scroll').attr('style', '');
					setTimeout(function(){
						thisProfolio.attr('style', '').removeClass('inside').find('.profolio-outside').attr('style', '');
					}, delay);

					profolio.method.showProfolios(profolio.$section.find('li').eq(0));
				});
      },
			changeOpacity: function() {
				// change opacity when scroll profolio inside
				var newOpacity = 1 - (profolio.$section.scrollTop()) / 300;
				profolio.$section.find('.scroll').css('opacity', newOpacity);
				profolio.$section.find('.inside .profolio-outside').css('opacity', newOpacity);
			},
    	throttle: function(fn, threshhold, scope) {
				// throttle event function
	      var last,
	          deferTimer;
	      // default 250 ms if not setting
	      threshhold = threshhold || 250;
	      return function () {
	        var context = scope || this;

	        var now = +new Date,
	            args = arguments;
	        if (last && now < last + threshhold) {
	          // hold on to it
	          clearTimeout(deferTimer);
	          deferTimer = setTimeout(function () {
	            last = now;
	            fn.apply(context, args);
	          }, threshhold);
	        } else {
	          last = now;
	          fn.apply(context, args);
	        }
	      };
   		}
    },
    bind: {
    	open: function() {
				// bind profolio outside - open
				profolio.$section.find('.profolio').off('click').on('click', function(){
					profolio.method.openProfolio($(this));
				});
    	},
    	close: function() {
				// bind profolio inside - close
				profolio.$section.find('.close').off('click').on('click', function(){
					profolio.method.closeProfolio(profolio.$section.find('.inside'));
				});
    	},
    	down: function() {
				// bind profolio inside - down
				profolio.$section.find('.scroll').off('click').on('click', function(){
					profolio.$section.animate({'scrollTop':$(window).height()}, 500);
				});
    	},
    	scrolling: function() {
				// bind profolio section - scrolling
				profolio.$section.on('scroll', profolio.method.throttle(function(e){
					window.requestAnimationFrame(profolio.method.changeOpacity);
				}, 150));
    	}
    },
    init: function() {
    	// binding function
      profolio.bind.open();
      profolio.bind.close();
      profolio.bind.down();
      profolio.bind.scrolling();

			// check if background images loaded then show (if need)
			// profolio.$section.find('.profolio').arrangeProfolio({
			//   	loadCompleted : function(){
			//    		profolio.method.showProfolios(profolio.$section.find('li').eq(0));
			//   	}
			// });

			// just use
			profolio.method.showProfolios(profolio.$section.find('li').eq(0));
    }
	};

	profolio.init();

	window.app.profolio = profolio;

});
// init immediately (can use like plugin)
(function($){

	$.fn.arrangeProfolio = function(options) {
		// Default plugin settings
		var defaults = {
			// defaults setting
			loadCompleted : function(){
				this.addClass('loaded');
			}
		};

		// extend default and user settings
		var settings = $.extend({}, defaults, options);

		// Loop through element
		return this.each(function(){
			var $this = $(this),
					profolioImgs = window.getComputedStyle($this.get(0), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "").split(', ');
			$this.data('loaded-count', 0);
			$.each( profolioImgs, function(key, value){
				var profolioImg = value.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
				$('<img/>').attr('src', profolioImg).load(function() {
					$(this).remove(); // prevent memory leaks
					$this.data('loaded-count',$this.data('loaded-count')+1);
					if ($this.data('loaded-count') >= profolioImgs.length) {
						settings.loadCompleted.call($this);
					}
				});
			});

		});
	};

})(jQuery);
