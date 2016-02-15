'use strict';

class projects {
  constructor(window) {

		// for mywebsite, 暫時先改成這樣.. 未來import export
		(function($){
		  const scrolling = false;
		  const lastPos = 0;

			const profolio = profolio || {
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
						const mq = window.getComputedStyle(document.querySelector('.profolios-section'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, ""),
								delay = ( mq == 'mobile' ) ? 100 : 0; //check media query
						profolio.$section.removeClass('opening');
						// fade out this profolio
						thisProfolio.animate({opacity: 0}, 500, function(){
							thisProfolio.removeClass('loaded');
							setTimeout(function(){
								thisProfolio.attr('style', '').removeClass('inside').find('.profolio-outside').attr('style', '');
							}, delay);

							profolio.method.showProfolios(profolio.$section.find('li').eq(0));
						});
		      },
					changeOpacity: function() {
						// change opacity when scroll profolio inside
						const newOpacity = 1 - (profolio.$section.scrollTop()) / 300;
						profolio.$section.find('.inside .profolio-outside').css('opacity', newOpacity);
					},
		    	throttle: function(fn, threshhold, scope) {
						// throttle event function
			      let last;
			      let deferTimer = 0;
			      // default 250 ms if not setting
			      threshhold = threshhold || 250;
			      return function () {
			        let context = scope || this;

			        let now = +new Date,
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
							let $this = $(this);
							if($this.hasClass('inside'))
								return;
							profolio.method.openProfolio($this);
						});
		    	},
		    	close: function() {
						// bind profolio inside - close
						profolio.$section.find('.close').off('click').on('click', function(){
							profolio.method.closeProfolio(profolio.$section.find('.inside'));
						});
		    	},
		    	scroll: function() {
						// bind profolio section - scroll
						profolio.$section.on('scroll', profolio.method.throttle(function(e){
							window.requestAnimationFrame(profolio.method.changeOpacity);
						}, 150));
		    	}
		    },
		    init: function() {
					 // binding function
		      profolio.bind.open();
		      profolio.bind.close();
		      // profolio.bind.down();
		      profolio.bind.scroll();
	      	profolio.$section.find('.profolio-img').each(function() {
						let $this = $(this);
	      		$this.css('background-image', 'url(' + $this.data('imgsrc') + ')');
	      	});
					profolio.method.showProfolios(profolio.$section.find('li').eq(0));
		    },
		    start: function() {
		    	// for mywebsite start
		    	profolio.$section.find('li').removeClass('loaded inside');
			   	profolio.method.showProfolios(profolio.$section.find('li').eq(0));
		    }
		  };

			profolio.init();

			window.app.projects = window.app.profolio || profolio;

		})(jQuery);

	};
};

export default projects;