/* =========================================================
 * pure javascript implementation - jquery - support all browser => created by kevin hu
 * ========================================================= */

/*
	nodeType:

	If the node is an element node, the nodeType property will return 1.
	If the node is an attribute node, the nodeType property will return 2.
	If the node is a text node, the nodeType property will return 3.
	If the node is a comment node, the nodeType property will return 8.
 */

(function(global) {
  var myLibrary = function(selector, container) {
  	// implement every time
    return new myLibrary.method.init(selector, container);
  };

  // utils
  var utils = {
    trim: function(text) {
	    return (text || '').replace( /^(\s|\u00A0)+|(\s|\u00A0)+$/g, '');
    },
    isArray: function(obj) {
	    return Object.prototype.toString.call(obj) === '[object Array]';
    },
    isFunction: function(obj) {
	    return Object.prototype.toString.call(obj) === '[object Function]';
    },
    each: function(obj, callback) {
      var length = obj.length,
          isObj = (length === undefined) || this.isFunction(obj);
      if (isObj) {
				for(var name in obj) {
					if(callback.call(obj[name], obj[name], name) === false ) {
						break;
					}
				}
			} else {
				for(var i = 0, value = obj[0];
					i < length && callback.call(obj[i], value, i) !== false; value = obj[++i] ) {}
			}
      return obj;
    },
    makeArray: function(arrayLike) {
			if(arrayLike.length != null) {
        return Array.prototype.slice.call(arrayLike, 0)
              	.filter(function(ele) { return ele !== undefined; });
			}
      return [];
		},
		screen: function() {
      return {
        width: screen.width,
        height: screen.height,
        availWidth: screen.availWidth,
        availHeight: screen.availHeight
      };
	  },
	  window: function() {
      var xywh = {};
      if(window.screenX) {
				xywh.x = window.screenX;
				xywh.y = window.screenY;
      } else if(window.screenLeft) {
        xywh.x = window.screenLeft;
        xywh.y = window.screenTop;
      }

      if(window.outerWidth) {
        xywh.width = window.outerWidth;
        xywh.height = window.outerHeight;
      } else if(document.documentElement.offsetWidth) {
        xywh.width = document.documentElement.offsetWidth;
        xywh.height = document.documentElement.offsetHeight;
      } else if(document.body.offsetWidth) {
        xywh.width = document.body.offsetWidth;
        xywh.height = document.body.offsetHeight;
      }
      return xywh;
	  },
	  viewport: function() {
      var wh = {};
      if(window.innerWidth) {
        wh.width = window.innerWidth;
        wh.height = window.innerHeight;
      } else if(document.documentElement.clientWidth) {
        wh.width = document.documentElement.clientWidth;
        wh.height = document.documentElement.clientHeight;
      } else if(document.body.clientWidth) {
        wh.width = document.body.clientWidth;
        wh.height = document.body.clientHeight;
      }
      return wh;
	  },
	  scroll: function() {
      var xy = {};
      if(window.pageXOffset) {
        xy.x = window.pageXOffset;
        xy.y = window.pageYOffset;
      } else if(document.documentElement.srollLeft) {
        xy.x = document.documentElement.srollLeft;
        xy.y = document.documentElement.srollTop;
      } else if(document.body.srollLeft) {
        xy.x = document.body.srollLeft;
        xy.y = document.body.srollTop;
      }
      return xy;
	  },
	  param: function(data) {
      var pairs = [];
      for(var name in data) {
        var pair = encodeURIComponent(name) + '=' + encodeURIComponent(data[name]);
        pairs.push(pair.replace('/%20/g', '+'));
      }
      return pairs.join('&');
	  },
	  // before IE 7 & IE 7 can't use local file -> ActiveXObject
	  // xhr: window.XMLHttpRequest && (window.location.protocol !== 'file:' || !window.ActiveXObject) ?
   //    function() {
   //      return new XMLHttpRequest();
   //    } :
   //    function() {
   //      try {
   //        return new ActiveXObject('Microsoft.XMLHTTP');
   //      } catch(e) {
   //        throw new Error('XMLHttpRequest not supported');
   //      }
   //    },
  	xhr: function(){
	    return new XMLHttpRequest();
    },
	  ajax: function(option) {
      option.header = option.header || {'Content-Type':'application/x-www-form-urlencoded'};
      option.callback = option.callback || function() {};

      if(!option.url || !option.method) {
        return;
      }

      var request = utils.xhr();
      request.onreadystatechange = function() {
        option.callback.call(request, request);
      };

      var body = null,
      		url = option.url;
      if(option.data) {
        if(option.method === 'POST') {
          body = utils.param(option.data);
        } else {
          url = option.url + '?' + utils.param(option.data) + '&time=' + new Date().getTime();
        }
      }

      request.open(option.method, url);
      for(var name in option.header) {
        request.setRequestHeader(name, option.header[name]);
      }
      request.send(body);
	  },
	  request: function(method, url, parameters, callback, type) {
      utils.ajax({
        method   : method,
        url      : url,
        data     : parameters,
        callback : function(request) {
          if(request.readyState === 4) {
            var result;
            if(type === 'xml') {
              result = request.responseXML;
            } else if(type === 'json') {
              // should use JSON.parse()
              result = eval(request.responseText);
            } else {
              result = request.responseText;
            }

            if(callback) {
              callback(result, request.status, request);
            }
          }
        }
      });
	  },
	  get: function(url, parameters, callback, type) {
      utils.request('GET', url, parameters, callback, type);
	  },
	  post: function(url, parameters, callback, type) {
      utils.request('POST', url, parameters, callback, type);
	  },
	  getScript: function(url, callback) {
	      var script = document.createElement('script');
	      script.type = 'text/javascript';
	      script.src = url;

	      // for all browser
	      script.onload = script.onreadystatechange = function() {
          if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
            this.onload = this.onreadystatechange = null;
            document.getElementsByTagName('head')[0].removeChild(this);
            if(callback) {
              callback();
            }
          }
	      };
	      document.getElementsByTagName('head')[0].appendChild(script);
	  },
	  jsonp: function(option, callbackName) {
      // 沒有url或伺服端要求的callbackName就結束
      if(!option.url || !callbackName) {
          return;
      }
      var data = option.data || {};

      // 建立暫時的函式
      data[callbackName] = 'myLibrary' + arguments.callee.jsc++;
      window[data[callbackName]] = function(json) {
          option.callback(json);
      };
      var url = option.url + '?' + utils.param(data);

      // 取得 script 檔案
      utils.getScript(url, function() {
        // script 下載並執行完後移除暫時的函式
        window[data[callbackName]] = undefined;
        try {
          delete window[data[callbackName]];
        }catch(e) {}
      });
	  }
  };

  // deal with Event
  myLibrary.Event = function(original) {
      if(!this.stopPropagation) {
        return new myLibrary.Event(original);
      }
      // stantard
      this.original = original;
      this.type = original.type;
      this.target = original.target || original.srcElement;
  };

  myLibrary.Event.prototype = {
    stopPropagation: function() {
      // stantard
      if(this.original.stopPropagation) {
        this.original.stopPropagation();
      } else {
        this.original.cancelBubble = true;
      }
    }
  };

  // stantard
  if(document.addEventListener) {
    utils.bind = function(element, eventType, handler) {
      element.addEventListener(eventType, function(event) {
        var result = handler.call(event.currentTarget, myLibrary.Event(event));
        if(result === false) {
          event.preventDefault();
        }
        return result;
      }, false);
    };
    utils.unbind = function(element, eventType, handler) {
      element.removeEventListener(eventType, handler, false);
    };
  } else if(document.attachEvent) {
    utils.bind = function(element, eventType, handler) {
      element.attachEvent('on' + eventType, function() {
        var result = handler.call(element, myLibrary.Event(window.event));
        if(result === false) {
          window.event.returnValue = false;
        }
        return result;
      });
    };
    utils.unbind = function(element, eventType, handler) {
      element.detachEvent(eventType, handler);
    };
  }

  // extend common method to myLibrary
  function extend(target, source) {
    utils.each(source, function(value, key) {
        target[key] = value;
    });
  }

  extend(myLibrary, utils);

  // extend method also add to myLibrary
  myLibrary.extend = extend;
  // standard name
  myLibrary.props = {
    'for': 'htmlFor',
    'class': 'className',
    readonly: 'readOnly',
    maxlength: 'maxLength',
    cellspacing: 'cellSpacing',
    rowspan: 'rowSpan',
    colspan: 'colSpan',
    tabindex: 'tabIndex',
    usemap: 'useMap',
    frameborder: 'frameBorder'
  };

  myLibrary.method = myLibrary.prototype = {
    init: function(selector, container) {
      // 選取的 element
			if(selector.nodeType) {
			  this[0] = selector;
			  this.length = 1;
			  return this;
			}

			if(container && container[0]) {
			  container = container[0];
			} else {
			  container = document;
			}

			var elements = [];
			// 可選取 multiple element by ','
			myLibrary.each(selector.split(','), function(text) {
			  text = myLibrary.trim(text);
			  // myLibrary('#xxx') -> id
			  if(text.charAt(0) === '#') {
			    elements.push(container.getElementById(text.substring(1)));
			  // myLibrary('<') -> html tag
			  } else if(text.charAt(0) === '.') {
				myLibrary.each(container.getElementsByClassName(text.substring(1)), function(element) {
			      elements.push(element);
			    });
			  // myLibrary('.xxx') -> class
			  } else if(text.charAt(0) === '<') {
			    elements.push(document.createElement(text.substring(1, text.length - 1)));
			  } else {
			    myLibrary.each(container.getElementsByTagName(text), function(element) {
			      elements.push(element);
			    });
			   }
			});

			// bound element to this
			myLibrary.extend(this, elements);
			this.length = elements.length;
    },
    size: function() {
		  return this.length;
		},
		isEmpty: function() {
		  return this.length === 0;
		},
		each: function(callback) {
		  return myLibrary.each(this, callback);
		},
		html: function(value) {
		  if(value === undefined) {
		    return this[0] && this[0].nodeType === 1 ? this[0].innerHTML : null;
		  } else {
		    return myLibrary.each(this, function(element) {
		      if(element.nodeType === 1) {
		        element.innerHTML = value;
		      }
		    });
		  }
		},
		attr: function(name, value) {
		  // convert to use
		  name = myLibrary.props[name] || name;
		  if(value === undefined) {
		    return this[0] && this[0].nodeType !== 3 && this[0].nodeType !== 8 ? this[0][name] : undefined;
		  } else {
		    return myLibrary.each(this, function(element) {
		      if(element.nodeType !== 3 && element.nodeType !== 8) {
		        element[name] = value;
		      }
		    });
		  }
		},
		val: function(value) {
			// 目前只處理 <input> 元素
			if(value === undefined) {
				return this[0] && this[0].nodeName === 'INPUT' ? this[0].value : null;
			} else {
			  return myLibrary.each(this, function(element) {
			    if(element.nodeName === 'INPUT') {
			      element.value = value;
			    }
			  });
			}
		},
		append: function(childs) {
		  if(typeof childs === 'string' || childs.nodeType) {
		    childs = myLibrary(childs);
		  }
			// 只有一個父節點
		  if(this.length === 1) {
		    var parent = this[0];
		    myLibrary.each(childs, function(child) {
		      parent.appendChild(child);
		    });
			// 有多個父節點
			} else if(this.length > 1){
			  myLibrary.each(this, function(parent) {
		      childs.each(function(child) {
						// 複製子節點
						var container = document.createElement('div');
						container.appendChild(child);
						container.innerHTML = container.innerHTML;
						parent.appendChild(container.firstChild);
		      });
			  });
			}
			return this;
    },
		appendTo: function(parents) {
			if(typeof parents === 'string' || parents.nodeType) {
				parents = myLibrary(parents);
			}
			return parents.append(this);
		},
		remove: function() {
			return myLibrary.each(this, function(element) {
				element.parentNode.removeChild(element);
			});
		},
		bind: function(eventType, handler) {
			return myLibrary.each(this, function(element) {
				myLibrary.bind(element, eventType, handler);
			});
		},
		unbind: function(eventType, handler) {
			return myLibrary.each(this, function(element) {
				myLibrary.unbind(element, eventType, handler);
			});
		},
		click: function(handler) {
			return this.bind('click', handler);
		},
		blur: function(handler) {
		  return this.bind('blur', handler);
		},
		css: function(name, value) {
			name = myLibrary.props[name] || name;
			if(value === undefined) {
				if(typeof name === 'string') {
				  if(this[0] && this[0].nodeType !== 3 && this[0].nodeType !== 8) {
						if(window.getComputedStyle) {
						  return window.getComputedStyle(this[0], null)[name];
						} else if(this[0].currentStyle) {
						  return this[0].currentStyle[name];
						} else {
						  return undefined;
						}
				   }
				} else {
				  myLibrary.each(this, function(element) {
			      if(element.nodeType !== 3 && element.nodeType !== 8) {
		          myLibrary.each(name, function(optValue, optName) {
	              optName = myLibrary.props[optName] || optName;
	              element.style[optName] = optValue;
		          });
			      }
				  });
				  return this;
				}
			} else {
				return myLibrary.each(this, function(element) {
				  if(element.nodeType !== 3 && element.nodeType !== 8) {
				    element.style[name] = value;
				  }
				});
			}
		},
		width: function(value) {
		  return this.css('width', value);
		},
		height: function(value) {
		  return this.css('height', value);
		},
		offset: function() {
			if(this[0]) {
				var left = 0,
						top = 0;

				for(var e = this[0]; e; e = e.offsetParent) {
					left += e.offsetLeft;
					top += e.offsetTop;
				}

				for(var e = this[0].parentNode; e && e != document.body; e = e.parentNode) {
					if(e.scrollLeft) {
					  left -= e.scrollLeft;
					}
					if(e.scrollTop) {
					  top -= e.scrollTop;
					}
				}

				return {
					left: left,
					top: top,
					offsetWidth : this[0].offsetWidth,
					offsetHeight : this[0].offsetHeight
				};
			}
		},
		hide: function() {
			return myLibrary.each(this, function(element) {
				var elementmyLibrary = myLibrary(element);
				element.previousDisplay = elementmyLibrary.css('display');
				element.style.display = 'none';
			});
		},
		show: function() {
			return myLibrary.each(this, function(element) {
				var elementmyLibrary = myLibrary(element);
				element.style.display = element.previousDisplay || '';
				if(elementmyLibrary.css('display') === 'none') {
					var node = document.createElement(element.nodeName);
					document.body.appendChild(node);
					element.style.display = myLibrary(node).css('display');
					document.body.removeChild(node);
				}
			});
		},
		opacity: function(value) {
	    if(value === undefined) {
				var opt = this.css('opacity') || this.css('filter');
				if(opt === '') {
				  return 1;
				}
				if(opt.indexOf('alpha') !== -1)  {
				  return opt.substring(14, opt.length - 1) / 100;
				}
				return parseFloat(opt);
	    } else {
        return myLibrary.each(this, function(element) {
          if(myLibrary(element).css('opacity') !== undefined) {
              element.style.opacity = value;
          } else {
              element.style.filter = 'alpha(opacity=' + parseInt(value * 100) + ')';
          }
        });
	    }
		},
		fadeIn: function(speed) {
	    speed = speed || 5000;
	    return myLibrary.each(this, function(element) {
        var target = element.previousOpacity || 1;
        delete element.previousOpacity;
        var step = target / speed * 500,
        		opt = 0;
        setTimeout(function next() {
          opt += step;
          if(opt < target) {
            myLibrary(element).opacity(opt);
            setTimeout(next);
          } else {
            myLibrary(element).opacity(target);
          }
        }, 500);
	    });
		},
		fadeOut: function(speed) {
			speed = speed || 5000;
			return myLibrary.each(this, function(element) {
				var elementmyLibrary = myLibrary(element);
				element.previousOpacity = elementmyLibrary.opacity();
				var step = element.previousOpacity / speed * 500,
						opt = element.previousOpacity;
				setTimeout(function next() {
					opt -= step;
					if(opt > 0) {
					  elementmyLibrary.opacity(opt);
					  setTimeout(next);
					} else {
					  elementmyLibrary.opacity(0);
					}
				}, 500);
			});
		},
		hasClass: function(thisClass) {
			if(this[0]) {
				var allClass = this[0].className;
				if(!allClass) {
				  return false;
				}
				if(allClass === thisClass) {
				  return true;
				}
				return allClass.search('\\b' + thisClass + '\\b') !== -1;
			}
			return false;
		},
		addClass: function(thisClass) {
			return myLibrary.each(this, function(element) {
				if(!myLibrary(element).hasClass(thisClass)) {
					if(element.className) {
					   thisClass = ' ' + thisClass;
					}
					element.className += thisClass;
				}
			});
		},
		removeClass: function(thisClass) {
			return myLibrary.each(this, function(element) {
			  element.className = element.className.replace(new RegExp('\\b' + thisClass + '\\b\\s*', 'g'), '');
			});
		},
		toggleClass: function(thisClass1, thisClass2) {
			return myLibrary.each(this, function(element) {
				var elementmyLibrary = myLibrary(element);
				if(elementmyLibrary.hasClass(thisClass1)) {
				  elementmyLibrary.removeClass(thisClass1);
				  elementmyLibrary.addClass(thisClass2);
				} else if(elementmyLibrary.hasClass(thisClass2)) {
				  elementmyLibrary.removeClass(thisClass2);
				  elementmyLibrary.addClass(thisClass1);
				}
			});
		}
	};

	// myLibrary.method, myLibrary.prototype 參考同一物件, 之後 myLibrary.method.init.prototype 再參考 myLibrary.method
  myLibrary.method.init.prototype = myLibrary.method;

  global.myLibrary = myLibrary;
})(this);