'use strict';

import gbg from '../scripts/ghostBtnGenerators';
import handleDateFormat from '../scripts/_handleDateFormat';
// import handleClickChangePage from '../scripts/_changePage';

class ucarIndex {
  constructor($ele) {
    // Single Source of Truth
    // this.state = {
    //   // API用
    //   from: "", //出發地
    //   ordDate: "", // 當下時間
    //   rentDate: "", // 取車日期
    //   time: "", // 取車時間
    //   site: "TAINAN", // 目的地
    //   carType: "00001",
    //   carNum: 1,
    //   adult: 2,  // 成人
    //   child: 0, // 孩童
    //   love: 0, // 愛心
    //   senior: 0, // 資深公民
    //   ticketQty: 2, // 要用算的
    //   toCarClass: "STANDARD",
    //   backCarClass: "STANDARD",
    //   fareType: "B2C",
    //   hsrBackFrom: "TAINAN",
    //   hsrBackFromCitycode: "TNN",
    //   hsrBackFromCityname: "台南",
    //   // UI用
    //   fromCitycode: '',
    //   fromCityname: '',
    //   siteCitycode: 'TNN',
    //   siteCityname: '台南',
    //   rentDateUI: '',
    //   timeUI: '',
    //   carTypeUI: 'SmartFor2'
    // };

    // //選取元素
    this.$app = $ele;
    // this.$ghostBtn = $ele.find('.ghostBtn');
    // this.$button = $ele.find('#submitBtn');

    // 方法
    this.init();
    this.eventListener();
    console.log(this.state);
  }

  /*
   *  init 頁面
   */

  init() {
    // const ucar = this;
    // // 時間
    // // const $rentDate = this.$app.find('#rentDate');
    // // const $rentDate = this.$app.find('#rentDate');
    // const $rentDate = this.$app.find('#rentDate');
    // const $rentTime = this.$app.find('#rentTime option:selected');
    // const time = $rentTime.val();
    // const timeUI = $rentTime.text();

    // // 日期
    // const daysArr = ["(日)","(一)","(二)","(三)","(四)","(五)","(六)"];
    // const date = new Date();
    // const day = (date.getDate()>9)?date.getDate():("0" + date.getDate());
    // const month = ((date.getMonth()+1)>9)?(date.getMonth()+1):("0" + (date.getMonth()+1));
    // const year = date.getFullYear();
    // const dateValue =  year.toString() + month.toString() + day.toString();
    // const dateUI = year.toString() + "-" + month.toString() + "-" + day.toString() + "" + daysArr[date.getDay()];
    // // 初始選項
    // const $from = this.$ghostBtn.find('#from option:selected');
    // const $to = this.$ghostBtn.find('#to option:selected');

    // $.extend(this.state, {
      // from: $from.val(),
      // ordDate: dateValue,
      // time: time,
      // timeUI: timeUI,
      // rentDate: dateValue,
      // rentDateUI: dateUI,
      // hsrDepartDate: dateValue,
      // hsrDepartDateUI: dateUI,
      // hsrBackDate: dateValue,
      // hsrBackDateUI: dateUI,
      // fromCitycode: $from.data('citycode'),
      // fromCityname: $from.data('cityname'),
      // hsrBackTo: $from.val(),
      // hsrBackToCitycode: $from.data('citycode'),
      // hsrBackToCityname: $from.data('cityname'),
      // siteCitycode: $to.data('citycode'),
      // siteCityname: $to.data('cityname')
    // });

    // 產生ghost button
    // this.$ghostBtn.map((i,d)=> new gbg(d, this.state, function(newState){
    //   $.extend( ucar.state, newState);
    // }));

    // 格式須為yyyy-mm-dd
    // $rentDate.val('2014-12-12');
  }

  /*
   *  event bind
   */

  eventListener() {

    // const $from = this.$ghostBtn.find('#from');
    // // const $to = this.$ghostBtn.find('#to');
    // const $rentDate = this.$app.find('#rentDate');

    // // 出發地 -> 取車時間
    // $from.on('change', ()=>{
    //   // console.log($rentTime);
    //   this.getCarTimeRange($from, $rentDate);
    // });
    // // 取車日期 -> 取車時間
    // $rentDate.on('change', ()=>{
    //   this.getCarTimeRange($from, $rentDate);
    // });
    // // 跳頁
    // this.$button.on('click', ()=>{
    //   const url = "/app/view/1/ucar/results?" + $.param( this.state).toString();
    //   window.location = url;
    // });
  }

  /*
   *  method 處理頁面邏輯
   *  先寫在頁面上..考慮移出js
   *  deal with min max date
   */

  // import gbg from '../scripts/ghostBtnGenerators';

  // 取車時間
  getCarTimeRange($from, $rentDate) {

//     const $rentTime = this.$app.find('#rentTime');
//     const $rentTimeUI = $rentTime.siblings('.infoBg').find('.value');

//     let currentDay = new Date();
//     let currentHour = currentDay.getHours();
//     let currentMinute = currentDay.getMinutes();
//     let tmrDay = currentDay.setDate(currentDay.getDate() + 1);
//     let timeIdx = 0;

// // console.log($rentTime);
// // console.log($rentTimeUI);

//     // 判斷 可租今明天的站別 - 台北, 板橋, 左營
//     if(this.state.from === 'TAIPEI' || this.state.from === 'BANQIAO' || this.state.from === 'ZUOYING'){
//       // $rentDate.datepicker('option', 'minDate', '0');
//       // 判斷選取日期是否是 今明天
//       if(this.isTodayTmr()){
//           // 判斷現在時間 0900前 , 0900~1500, 1500後
//         if(currentHour < 9){
//           // 判斷今明天
//           if(this.isTodayTmr() === 1)
//             timeIdx = 11;
//           else
//             timeIdx = this.defaultTimeIdx($from);
//         }
//         else if(currentHour < 15){
//           // 判斷今明天
//           if(this.isTodayTmr() === 1){
//             // 判斷現在時間 30分前, 30分後
//             if(currentMinute < 30)
//               $rentTime.val(('0' + (currentHour + 5)).slice(-2) + '30');
//             else
//               $rentTime.val(('0' + (currentHour + 6)).slice(-2) + '00');
//             timeIdx = $rentTime.find('option:selected').index();
//           }else
//             timeIdx = this.defaultTimeIdx($from);
//         }
//         else{
//           // 判斷今明天
//           if(this.isTodayTmr() === 1){
//             // 格式須為yyyy-mm-dd set tmr
//             // $rentDate.val('2014-12-12');
//             // $rentDate.datepicker('setDate', '+1');
//             // $rentDate.datepicker('option', 'minDate', '+1');
//           }
//           timeIdx = 11;
//         }
//       }else
//         timeIdx = this.defaultTimeIdx($from);
//     }else{
//       // $rentDate.datepicker('option', 'minDate', '3');
//       if(this.state.from === 'TAICHUNG' || this.state.from === 'CHIAYI')
//         timeIdx = 0;
//       else
//         timeIdx = 1;
//     }
//     this.hideTimeRange($rentTime, $rentTimeUI, timeIdx);
  }

  // 現在時間
  isTodayTmr() {
    // let tmrDay = new Date();
    // tmrDay.setDate(tmrDay.getDate() + 1);

    // if(this.state.rentDate === handleDateFormat().dateValue)
    //   return 1; // 1: today
    // if(this.state.rentDate === handleDateFormat(tmrDay).dateValue)
    //   return 2; // 2: tmr
    // return 0; // not today or tmr
  }

  // 取車時間default
  defaultTimeIdx($from) {
    // // method - 預設取車的時間 default time range

    // // var $hsrFrom = ezHsrucar.$mainFilterSection.find('select.hsr-departure-start');
    // // 正常情況
    // if($from.val() === 'ZUOYING')
    //   return  0;
    // else if($from.val() === 'TAIPEI' || $from.val() === 'BANQIAO')
    //   return  1;
  }

  hideTimeRange($rentTime, $rentTimeUI, timeIdx) {
    // method 隱藏不可的取車時間
// console.log($rentTime.val())
// console.log(timeIdx);

//     $rentTime.children().removeClass('hide');
//     for(let i = $rentTime.children().length; i > 0; i -= 1){
//       if(i < timeIdx + 1)
//         $rentTime.children().eq(i-1).addClass('hide');
//     }
//     $rentTime.children().eq(timeIdx).prop('selected', true);
//     this.state.time = $rentTime.children().eq(timeIdx).val();
//     this.state.timeUI = $rentTime.find('option:selected').text();
// // console.log(this.state);
//     $rentTime.val(this.state.time);
//     $rentTimeUI.html(this.state.timeUI);
  }
}

export default ucarIndex;
