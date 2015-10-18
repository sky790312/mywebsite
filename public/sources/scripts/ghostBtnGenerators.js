'use strict';

import handleDateFormat from './_handleDateFormat';

class ghostBtnGenerators {
  constructor(ele, state, callback) {
    // 選取元素
    this.$gb = $(ele);
    this.state = state;
    this.callback = callback;
    this.$oriComp = this.$gb.find('.oriComp');
    // 方法
    this.init();
  }
  // 將原始component轉化成ghost button;
  init() {
    this.$oriComp.css({
      'height': '100%'
    });
    this.getBtnTitle();
    this.eventListener();
  }
  // 監聽操作事件
  eventListener() {
    this.$gb.find('.oriComp').off('change').on('change', ()=>{this.handleEvents()});
  }
  // 把state裡的值放進Ghost Button;
  getBtnTitle() {
    let $uiValue = this.$gb.find('.value');
    if ( this.$gb.hasClass('pureSelect')) {
      this.$gb.find('.title').text(this.$gb.find('option:selected').val());
      return;
    }
    switch (this.$gb.data('target')) {
      case "from":
        $uiValue.find('.big').html( this.state.fromCitycode);
        $uiValue.find('.small').html( this.state.fromCityname);
        // // 連動 - 取車時間
        // this.getCarTimeRange();
        break;
      case "site":
        $uiValue.find('.big').html( this.state.siteCitycode);
        $uiValue.find('.small').html( this.state.siteCityname);
        break;
      case "rentDate":
        $uiValue.html( this.state.rentDateUI);
        break;
      case "hsrDepartDate":
        $uiValue.html( this.state.hsrDepartDateUI);
        break;
      case "hsrBackDate":
        $uiValue.html( this.state.hsrBackDateUI);
        break;
      case "time":
        $uiValue.html( this.state.timeUI);
        break;
      case "hsrBackTo":
        $uiValue.find('.big').html( this.state.hsrBackToCitycode);
        $uiValue.find('.small').html( this.state.hsrBackToCityname);
        break;
    }
  }
  // 處理狀態改變時
  // 因為幾乎有連動關係，所以會不停複寫
  handleEvents() {
    switch( this.$oriComp.parent().data('target')) {
      case "from":
        let $from = this.$oriComp.find('option:selected');
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
        let rentDate = handleDateFormat(this.$oriComp.val());
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
        let hsrDepartDate = handleDateFormat(this.$oriComp.val());
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
        let hsrBackDate = handleDateFormat(this.$oriComp.val());
        this.callback({
          hsrBackDate: hsrBackDate.dateValue,
          hsrBackDateUI: hsrBackDate.dateUI
        }, {
          callbackType: "BACK_TABLE"
        });
        break;
      case "time":
        let $time = this.$oriComp.find('option:selected');
        this.callback({
          time: $time.val(),
          timeUI: $time.text()
        });
        break;
      case "hsrBackTo":
        let $hsrBackTo = this.$oriComp.find('option:selected');
        this.callback({
          hsrBackTo: $hsrBackTo.val(),
          hsrBackToCitycode: $hsrBackTo.data('citycode'),
          hsrBackToCityname: $hsrBackTo.data('cityname'),
        }, {
          callbackType: "BACK_TABLE"
        });
        break;
    }
    this.getBtnTitle();
  }

  // 關於取車時間的連動
  getCarTimeRange() {
    let $uiValue = this.$gb.find('.value');
console.log(this.$gb);
    if(this.state.from === 'TAIPEI' || this.state.from === 'BANQIAO' || this.state.from === 'ZUOYING'){
      $uiValue.html( '14:00');

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
    }else{
      // $rentDate.datepicker('option', 'minDate', '3');
      // if(this.state.from === 'TAICHUNG' || this.state.from === 'CHIAYI')
      //   ezHsrucar.setting.moreInfo.timeIdx = 0;
      // else
      //   ezHsrucar.setting.moreInfo.timeIdx = 1;
    }
    // ezHsrucar.method.hideTimeRange();
  }
}


export default ghostBtnGenerators;
