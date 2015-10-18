/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	__webpack_require__(2);

	__webpack_require__(6);

	// import FastClick from 'fastclick';

	var _scriptsIndexJs = __webpack_require__(8);

	var _scriptsIndexJs2 = _interopRequireDefault(_scriptsIndexJs);

	// FastClick.attach(document.body);

	window.index = _scriptsIndexJs2['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
2,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _scriptsGhostBtnGenerators = __webpack_require__(9);

	var _scriptsGhostBtnGenerators2 = _interopRequireDefault(_scriptsGhostBtnGenerators);

	var _scripts_handleDateFormat = __webpack_require__(10);

	var _scripts_handleDateFormat2 = _interopRequireDefault(_scripts_handleDateFormat);

	// import handleClickChangePage from '../scripts/_changePage';

	var ucarIndex = (function () {
	  function ucarIndex($ele) {
	    _classCallCheck(this, ucarIndex);

	    // Single Source of Truth
	    this.state = {
	      // API用
	      from: "", //出發地
	      ordDate: "", // 當下時間
	      rentDate: "", // 取車日期
	      time: "", // 取車時間
	      site: "TAINAN", // 目的地
	      carType: "00001",
	      carNum: 1,
	      adult: 2, // 成人
	      child: 0, // 孩童
	      love: 0, // 愛心
	      senior: 0, // 資深公民
	      ticketQty: 2, // 要用算的
	      toCarClass: "STANDARD",
	      backCarClass: "STANDARD",
	      fareType: "B2C",
	      hsrBackFrom: "TAINAN",
	      hsrBackFromCitycode: "TNN",
	      hsrBackFromCityname: "台南",
	      // UI用
	      fromCitycode: '',
	      fromCityname: '',
	      siteCitycode: 'TNN',
	      siteCityname: '台南',
	      rentDateUI: '',
	      timeUI: '',
	      carTypeUI: 'SmartFor2'
	    };

	    //選取元素
	    this.$app = $ele;
	    this.$ghostBtn = $ele.find('.ghostBtn');
	    this.$button = $ele.find('#submitBtn');

	    // 方法
	    this.init();
	    this.eventListener();
	    console.log(this.state);
	  }

	  /*
	   *  init 頁面
	   */

	  _createClass(ucarIndex, [{
	    key: 'init',
	    value: function init() {
	      var _this = this;

	      var ucar = this;
	      // 時間
	      // const $rentDate = this.$app.find('#rentDate');
	      // const $rentDate = this.$app.find('#rentDate');
	      var $rentDate = this.$app.find('#rentDate');
	      var $rentTime = this.$app.find('#rentTime option:selected');
	      var time = $rentTime.val();
	      var timeUI = $rentTime.text();

	      // 日期
	      var daysArr = ["(日)", "(一)", "(二)", "(三)", "(四)", "(五)", "(六)"];
	      var date = new Date();
	      var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	      var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
	      var year = date.getFullYear();
	      var dateValue = year.toString() + month.toString() + day.toString();
	      var dateUI = year.toString() + "-" + month.toString() + "-" + day.toString() + "" + daysArr[date.getDay()];
	      // 初始選項
	      var $from = this.$ghostBtn.find('#from option:selected');
	      var $to = this.$ghostBtn.find('#to option:selected');

	      $.extend(this.state, {
	        from: $from.val(),
	        ordDate: dateValue,
	        time: time,
	        timeUI: timeUI,
	        rentDate: dateValue,
	        rentDateUI: dateUI,
	        hsrDepartDate: dateValue,
	        hsrDepartDateUI: dateUI,
	        hsrBackDate: dateValue,
	        hsrBackDateUI: dateUI,
	        fromCitycode: $from.data('citycode'),
	        fromCityname: $from.data('cityname'),
	        hsrBackTo: $from.val(),
	        hsrBackToCitycode: $from.data('citycode'),
	        hsrBackToCityname: $from.data('cityname'),
	        siteCitycode: $to.data('citycode'),
	        siteCityname: $to.data('cityname')
	      });

	      // 產生ghost button
	      this.$ghostBtn.map(function (i, d) {
	        return new _scriptsGhostBtnGenerators2['default'](d, _this.state, function (newState) {
	          $.extend(ucar.state, newState);
	        });
	      });

	      // 格式須為yyyy-mm-dd
	      // $rentDate.val('2014-12-12');
	    }

	    /*
	     *  event bind
	     */

	  }, {
	    key: 'eventListener',
	    value: function eventListener() {
	      var _this2 = this;

	      var $from = this.$ghostBtn.find('#from');
	      // const $to = this.$ghostBtn.find('#to');
	      var $rentDate = this.$app.find('#rentDate');

	      // 出發地 -> 取車時間
	      $from.on('change', function () {
	        // console.log($rentTime);
	        _this2.getCarTimeRange($from, $rentDate);
	      });
	      // 取車日期 -> 取車時間
	      $rentDate.on('change', function () {
	        _this2.getCarTimeRange($from, $rentDate);
	      });
	      // 跳頁
	      this.$button.on('click', function () {
	        var url = "/app/view/1/ucar/results?" + $.param(_this2.state).toString();
	        window.location = url;
	      });
	    }

	    /*
	     *  method 處理頁面邏輯
	     *  先寫在頁面上..考慮移出js
	     *  deal with min max date
	     */

	    // import gbg from '../scripts/ghostBtnGenerators';

	    // 取車時間
	  }, {
	    key: 'getCarTimeRange',
	    value: function getCarTimeRange($from, $rentDate) {

	      var $rentTime = this.$app.find('#rentTime');
	      var $rentTimeUI = $rentTime.siblings('.infoBg').find('.value');

	      var currentDay = new Date();
	      var currentHour = currentDay.getHours();
	      var currentMinute = currentDay.getMinutes();
	      var tmrDay = currentDay.setDate(currentDay.getDate() + 1);
	      var timeIdx = 0;

	      // console.log($rentTime);
	      // console.log($rentTimeUI);

	      // 判斷 可租今明天的站別 - 台北, 板橋, 左營
	      if (this.state.from === 'TAIPEI' || this.state.from === 'BANQIAO' || this.state.from === 'ZUOYING') {
	        // $rentDate.datepicker('option', 'minDate', '0');
	        // 判斷選取日期是否是 今明天
	        if (this.isTodayTmr()) {
	          // 判斷現在時間 0900前 , 0900~1500, 1500後
	          if (currentHour < 9) {
	            // 判斷今明天
	            if (this.isTodayTmr() === 1) timeIdx = 11;else timeIdx = this.defaultTimeIdx($from);
	          } else if (currentHour < 15) {
	            // 判斷今明天
	            if (this.isTodayTmr() === 1) {
	              // 判斷現在時間 30分前, 30分後
	              if (currentMinute < 30) $rentTime.val(('0' + (currentHour + 5)).slice(-2) + '30');else $rentTime.val(('0' + (currentHour + 6)).slice(-2) + '00');
	              timeIdx = $rentTime.find('option:selected').index();
	            } else timeIdx = this.defaultTimeIdx($from);
	          } else {
	            // 判斷今明天
	            if (this.isTodayTmr() === 1) {
	              // 格式須為yyyy-mm-dd set tmr
	              // $rentDate.val('2014-12-12');
	              // $rentDate.datepicker('setDate', '+1');
	              // $rentDate.datepicker('option', 'minDate', '+1');
	            }
	            timeIdx = 11;
	          }
	        } else timeIdx = this.defaultTimeIdx($from);
	      } else {
	        // $rentDate.datepicker('option', 'minDate', '3');
	        if (this.state.from === 'TAICHUNG' || this.state.from === 'CHIAYI') timeIdx = 0;else timeIdx = 1;
	      }
	      this.hideTimeRange($rentTime, $rentTimeUI, timeIdx);
	    }

	    // 現在時間
	  }, {
	    key: 'isTodayTmr',
	    value: function isTodayTmr() {
	      var tmrDay = new Date();
	      tmrDay.setDate(tmrDay.getDate() + 1);

	      if (this.state.rentDate === (0, _scripts_handleDateFormat2['default'])().dateValue) return 1; // 1: today
	      if (this.state.rentDate === (0, _scripts_handleDateFormat2['default'])(tmrDay).dateValue) return 2; // 2: tmr
	      return 0; // not today or tmr
	    }

	    // 取車時間default
	  }, {
	    key: 'defaultTimeIdx',
	    value: function defaultTimeIdx($from) {
	      // method - 預設取車的時間 default time range

	      // var $hsrFrom = ezHsrucar.$mainFilterSection.find('select.hsr-departure-start');
	      // 正常情況
	      if ($from.val() === 'ZUOYING') return 0;else if ($from.val() === 'TAIPEI' || $from.val() === 'BANQIAO') return 1;
	    }
	  }, {
	    key: 'hideTimeRange',
	    value: function hideTimeRange($rentTime, $rentTimeUI, timeIdx) {
	      // method 隱藏不可的取車時間
	      // console.log($rentTime.val())
	      // console.log(timeIdx);

	      $rentTime.children().removeClass('hide');
	      for (var i = $rentTime.children().length; i > 0; i -= 1) {
	        if (i < timeIdx + 1) $rentTime.children().eq(i - 1).addClass('hide');
	      }
	      $rentTime.children().eq(timeIdx).prop('selected', true);
	      this.state.time = $rentTime.children().eq(timeIdx).val();
	      this.state.timeUI = $rentTime.find('option:selected').text();
	      // console.log(this.state);
	      $rentTime.val(this.state.time);
	      $rentTimeUI.html(this.state.timeUI);
	    }
	  }]);

	  return ucarIndex;
	})();

	exports['default'] = ucarIndex;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _handleDateFormat = __webpack_require__(10);

	var _handleDateFormat2 = _interopRequireDefault(_handleDateFormat);

	var ghostBtnGenerators = (function () {
	  function ghostBtnGenerators(ele, state, callback) {
	    _classCallCheck(this, ghostBtnGenerators);

	    // 選取元素
	    this.$gb = $(ele);
	    this.state = state;
	    this.callback = callback;
	    this.$oriComp = this.$gb.find('.oriComp');
	    // 方法
	    this.init();
	  }

	  // 將原始component轉化成ghost button;

	  _createClass(ghostBtnGenerators, [{
	    key: 'init',
	    value: function init() {
	      this.$oriComp.css({
	        'height': '100%'
	      });
	      this.getBtnTitle();
	      this.eventListener();
	    }

	    // 監聽操作事件
	  }, {
	    key: 'eventListener',
	    value: function eventListener() {
	      var _this = this;

	      this.$gb.find('.oriComp').off('change').on('change', function () {
	        _this.handleEvents();
	      });
	    }

	    // 把state裡的值放進Ghost Button;
	  }, {
	    key: 'getBtnTitle',
	    value: function getBtnTitle() {
	      var $uiValue = this.$gb.find('.value');
	      if (this.$gb.hasClass('pureSelect')) {
	        this.$gb.find('.title').text(this.$gb.find('option:selected').val());
	        return;
	      }
	      switch (this.$gb.data('target')) {
	        case "from":
	          $uiValue.find('.big').html(this.state.fromCitycode);
	          $uiValue.find('.small').html(this.state.fromCityname);
	          // // 連動 - 取車時間
	          // this.getCarTimeRange();
	          break;
	        case "site":
	          $uiValue.find('.big').html(this.state.siteCitycode);
	          $uiValue.find('.small').html(this.state.siteCityname);
	          break;
	        case "rentDate":
	          $uiValue.html(this.state.rentDateUI);
	          break;
	        case "hsrDepartDate":
	          $uiValue.html(this.state.hsrDepartDateUI);
	          break;
	        case "hsrBackDate":
	          $uiValue.html(this.state.hsrBackDateUI);
	          break;
	        case "time":
	          $uiValue.html(this.state.timeUI);
	          break;
	        case "hsrBackTo":
	          $uiValue.find('.big').html(this.state.hsrBackToCitycode);
	          $uiValue.find('.small').html(this.state.hsrBackToCityname);
	          break;
	      }
	    }

	    // 處理狀態改變時
	    // 因為幾乎有連動關係，所以會不停複寫
	  }, {
	    key: 'handleEvents',
	    value: function handleEvents() {
	      switch (this.$oriComp.parent().data('target')) {
	        case "from":
	          var $from = this.$oriComp.find('option:selected');
	          this.callback({
	            from: $from.val(),
	            fromCitycode: $from.data('citycode'),
	            fromCityname: $from.data('cityname'),
	            hsrBackTo: $from.val(),
	            hsrBackToCitycode: $from.data('citycode'),
	            hsrBackToCityname: $from.data('cityname')
	          });
	          break;
	        case "rentDate":
	          // 取車日期
	          var rentDate = (0, _handleDateFormat2['default'])(this.$oriComp.val());
	          this.callback({
	            rentDate: rentDate.dateValue,
	            rentDateUI: rentDate.dateUI,
	            hsrDepartDate: rentDate.dateValue,
	            hsrDepartDateUI: rentDate.dateUI,
	            hsrBackDate: rentDate.dateValue,
	            hsrBackDateUI: rentDate.dateUI
	          });
	          break;
	        case "hsrDepartDate":
	          // 高鐵出發日期
	          var hsrDepartDate = (0, _handleDateFormat2['default'])(this.$oriComp.val());
	          this.callback({
	            hsrDepartDate: hsrDepartDate.dateValue,
	            hsrDepartDateUI: hsrDepartDate.dateUI,
	            hsrBackDate: hsrDepartDate.dateValue,
	            hsrBackDateUI: hsrDepartDate.dateUI
	          }, {
	            callbackType: "TO_TABLE"
	          });
	          break;
	        case "hsrBackDate":
	          var hsrBackDate = (0, _handleDateFormat2['default'])(this.$oriComp.val());
	          this.callback({
	            hsrBackDate: hsrBackDate.dateValue,
	            hsrBackDateUI: hsrBackDate.dateUI
	          }, {
	            callbackType: "BACK_TABLE"
	          });
	          break;
	        case "time":
	          var $time = this.$oriComp.find('option:selected');
	          this.callback({
	            time: $time.val(),
	            timeUI: $time.text()
	          });
	          break;
	        case "hsrBackTo":
	          var $hsrBackTo = this.$oriComp.find('option:selected');
	          this.callback({
	            hsrBackTo: $hsrBackTo.val(),
	            hsrBackToCitycode: $hsrBackTo.data('citycode'),
	            hsrBackToCityname: $hsrBackTo.data('cityname')
	          }, {
	            callbackType: "BACK_TABLE"
	          });
	          break;
	      }
	      this.getBtnTitle();
	    }

	    // 關於取車時間的連動
	  }, {
	    key: 'getCarTimeRange',
	    value: function getCarTimeRange() {
	      var $uiValue = this.$gb.find('.value');
	      console.log(this.$gb);
	      if (this.state.from === 'TAIPEI' || this.state.from === 'BANQIAO' || this.state.from === 'ZUOYING') {
	        $uiValue.html('14:00');

	        // // $rentDate.datepicker('option', 'minDate', '0');
	        // // 判斷選取日期是否是 今明天
	        // if(ezHsrucar.method.isTodayTmr()){
	        //     // 判斷現在時間 0900前 , 0900~1500, 1500後
	        //   if(currentHour < 9){
	        //     // 判斷今明天
	        //     if(ezHsrucar.method.isTodayTmr() === 1)
	        //       ezHsrucar.setting.moreInfo.timeIdx = 11;
	        //     else
	        //       ezHsrucar.method.defaultTimeIdx();
	        //   }
	        //   else if(currentHour < 15){
	        //     // 判斷今明天
	        //     if(ezHsrucar.method.isTodayTmr() === 1){
	        //       // 判斷現在時間 30分前, 30分後
	        //       if(currentMinute < 30)
	        //         $rentTime.selectpicker('val', ('0' + (currentHour + 5)).slice(-2) + '30');
	        //       else
	        //         $rentTime.selectpicker('val', ('0' + (currentHour + 6)).slice(-2) + '00');
	        //       ezHsrucar.setting.moreInfo.timeIdx = $rentTime.find('option:selected').index();
	        //     }else
	        //       ezHsrucar.method.defaultTimeIdx();
	        //   }
	        //   else{
	        //     // 判斷今明天
	        //     if(ezHsrucar.method.isTodayTmr() === 1){
	        //       $rentDate.datepicker('setDate', '+1');
	        //       $rentDate.datepicker('option', 'minDate', '+1');
	        //     }
	        //     ezHsrucar.setting.moreInfo.timeIdx = 11;
	        //   }
	        // }else{
	        //   ezHsrucar.method.defaultTimeIdx();
	        // }
	      } else {}
	        // $rentDate.datepicker('option', 'minDate', '3');
	        // if(this.state.from === 'TAICHUNG' || this.state.from === 'CHIAYI')
	        //   ezHsrucar.setting.moreInfo.timeIdx = 0;
	        // else
	        //   ezHsrucar.setting.moreInfo.timeIdx = 1;

	        // ezHsrucar.method.hideTimeRange();
	    }
	  }]);

	  return ghostBtnGenerators;
	})();

	exports['default'] = ghostBtnGenerators;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	// 處理時間格式
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = handleDateFormat;

	function handleDateFormat(inputDate) {
	  var daysArr = ["(日)", "(一)", "(二)", "(三)", "(四)", "(五)", "(六)"];
	  var dateObj = {};
	  var date = inputDate ? new Date(inputDate) : new Date();
	  var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	  var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
	  var year = date.getFullYear();
	  var dateValue = year.toString() + month.toString() + day.toString();
	  var dateUI = year.toString() + "-" + month.toString() + "-" + day.toString() + "" + daysArr[date.getDay()];
	  dateObj = {
	    dateValue: dateValue,
	    dateUI: dateUI
	  };
	  return dateObj;
	}

	module.exports = exports["default"];

/***/ }
/******/ ])));