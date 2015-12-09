'use strict';

class aboutme {
  constructor() {

		(function(){
			var aboutme = aboutme || {
				settings: {
					pagesObj: [],
					active: '',
					prev: '',
					animateStop: '',
					animateId: 0,
					perspective: 6,
					timeStep: 0.05,
					pointer: {
						x: 0,
						y: 0
					},
					screen: {
						w: 0,
						h: 0
					},
					position: {
						x: 0,
						y: 0
					},
					target: {
						x: 0,
						y: 0
					},
					parallax: {
						x: 0,
						y: 0
					}
				},
				method: {
					// run the parallax animation
					run: function() {
						aboutme.settings.animateId = requestAnimationFrame(aboutme.method.run);
				    aboutme.settings.animateStop = false;
						aboutme.settings.parallax.x += (aboutme.settings.pointer.x - aboutme.settings.parallax.x) * (aboutme.settings.timeStep * 0.5);
						aboutme.settings.parallax.y += (aboutme.settings.pointer.y - aboutme.settings.parallax.y) * (aboutme.settings.timeStep * 0.5);
						aboutme.settings.position.x += (aboutme.settings.target.x - aboutme.settings.position.x) * aboutme.settings.timeStep;
						aboutme.settings.position.y += (aboutme.settings.target.y - aboutme.settings.position.y) * aboutme.settings.timeStep;
						for (var i = 0, n = aboutme.settings.pagesObj.length; i < n; i++) {
							var eachPage = aboutme.settings.pagesObj[i];
							if (eachPage.visible) {
								for (var j = 0, m = eachPage.nodes.length; j < m; j++) {
									var eachPageElem = eachPage.nodes[j];
									var transform = 'matrix(1, 0, 0, 1,' + ((eachPage.x - aboutme.settings.parallax.x * 0.5 - aboutme.settings.position.x) * eachPageElem.animateValue) + ',' +
																											((eachPage.y - aboutme.settings.parallax.y * 0.5 - aboutme.settings.position.y) * eachPageElem.animateValue) + ')';
									eachPageElem.css.transform = eachPageElem.css.webkitTransform = transform;
								}
							}
						}
					},
					// stop the parallax animation
					stop: function() {
      			aboutme.settings.active = '';
      			aboutme.settings.prev = '';
						if (aboutme.settings.animateId) {
		      		window.cancelAnimationFrame(aboutme.settings.animateId);
			    		aboutme.settings.animateStop = true;
		    		}
					},
					// get about current window
					resize: function() {
						aboutme.settings.screen.w = document.body.offsetWidth;
						aboutme.settings.screen.h = document.body.offsetHeight;
					},
					// go to next page
					goto: function() {
						var hashId = location.hash;
						for (var i = 0, n = aboutme.settings.pagesObj.length; i < n; i++) {
							if (aboutme.settings.pagesObj[i].id == hashId) {
								aboutme.settings.prev = aboutme.settings.active;
								aboutme.settings.active = aboutme.settings.pagesObj[i];
								aboutme.settings.target.x = aboutme.settings.active.x;
								aboutme.settings.target.y = aboutme.settings.active.y;
								if (aboutme.settings.prev) {
									setTimeout(function() {
										aboutme.settings.prev.elem.style.visibility = "hidden";
										aboutme.settings.prev.visible = false;
									}, 800);
								}
								aboutme.settings.active.elem.style.visibility = "visible";
								aboutme.settings.active.visible = true;
								return;
							}
						}
					}
				},
				bind: {
					// window mousemove event
					mousemove: function() {
						document.getElementById('parallax').addEventListener("mousemove", function(e) {
						// window.addEventListener("mousemove", function(e) {
							// if(e.target.id === 'header' || )
							e.preventDefault();
							aboutme.settings.pointer.x = e.clientX - aboutme.settings.screen.w * 0.5;
							aboutme.settings.pointer.y = e.clientY - aboutme.settings.screen.h * 0.5;
						}, false);
					},
					// window resize event
					resize: function() {
						window.addEventListener("resize", aboutme.method.resize, false);
					},
					onhashchange: function() {
						if(location.pathname === '/aboutme')
							window.addEventListener("hashchange", aboutme.method.goto, false);
					}
				},
				unbind: {
					offhashchange: function() {
						if(!location.pathname === '/aboutme')
							window.removeEventListener("hashchange", aboutme.method.goto, false);
					}
				},
				init: function() {

					aboutme.bind.mousemove();
					aboutme.bind.resize();
					aboutme.bind.onhashchange();

					var pages = document.querySelectorAll('.page');

					for (var i = 0, n = pages.length; i < n; i++) {
						var eachPage = pages[i];
						var eachPageObj = {
							elem: eachPage,
							id: eachPage.id,
							x: eachPage.offsetLeft,
							y: eachPage.offsetTop,
							visible: false,
							nodes: []
						};
						aboutme.settings.pagesObj.push(eachPageObj);
						eachPage.style.position = 'static';

						//get all elements inside pages to parallax animation
						var elems = eachPage.getElementsByTagName('*');

						for (var j = 0, m = elems.length; j < m; j++) {
							var eachElem = elems[j];
							if (eachElem.className.indexOf('prx') >= 0) {
								eachPageObj.nodes.push({
									css: eachElem.style,
									animateValue: Math.min(aboutme.settings.perspective, aboutme.settings.perspective / (aboutme.settings.perspective + 1)),
								});
							}
						}
					}

					aboutme.method.resize();
					aboutme.method.run();

					if (location.hash !== '' && location.hash !== "#")
						aboutme.method.goto(location.hash);
					else
						window.location.hash = "#who-i-am";

					// mobile handle 再想想
					// if($('html').hasClass('touch'))
						// aboutme.method.stop();
				}
			}

			aboutme.init();

			window.app.aboutme = window.app.aboutme || aboutme;

		})();

	};
};

export default aboutme;