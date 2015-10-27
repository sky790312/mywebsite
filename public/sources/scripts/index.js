'use strict';

import gbg from '../scripts/ghostBtnGenerators';
// import handleDateFormat from '../scripts/profolio-presentation';
// import handleClickChangePage from '../scripts/_changePage';

class index {
  constructor($ele) {
    // Single Source of Truth
    // this.state = {
    // };

    // //選取元素
    this.$app = $ele;
    // this.$ghostBtn = $ele.find('.ghostBtn');
    // this.$button = $ele.find('#submitBtn');

    // 方法
    this.init();
    this.eventListener();
    console.log(this.$app.find('#title-photo'));
  }

  /*
   *  init 頁面
   */

  init() {
    // const app = this;

    // $.extend(this.state, {

    // });

    // 產生ghost button
    // this.$ghostBtn.map((i,d)=> new gbg(d, this.state, function(newState){
    //   $.extend( ucar.state, newState);
    // }));
  }

  /*
   *  event bind
   */

  eventListener() {
    const $from = this.$app.find('#title-photo');
    const $to = this.$app.find('#projects');
    const $goProjects = this.$app.find('.projects');

    // go projects
    this.changePage($goProjects, $from, $to, ()=>{
      console.log($to);
    }); 

    // $from.on('change', ()=>{

    // });
  }

  changePage($trigger, $from, $to, callback) {
      $trigger.off('click').on('click', ()=>{
        // $from.fadeOut();
        // $to.fadeIn();
        $to.addClass('show').removeClass('hide');
        $from.removeClass('show').addClass('hide');
        if (typeof callback === 'function') {
          callback();
        }
      });
  }
}

export default index;
