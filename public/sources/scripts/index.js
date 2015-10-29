'use strict';

// import gbg from '../scripts/ghostBtnGenerators';
// import handleDateFormat from '../scripts/profolio-presentation';
// import handleClickChangePage from '../scripts/_changePage';

window.app = {};

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
  }

  /*
   *  init 頁面
   */

  init() {
    // const app = this;

    // $.extend(this.state, {

    // });

    // this.$app.find('section').addClass('hide');

    console.log(location.pathname)
    console.log(history.state)
    // new page url check
    if(location.pathname){
      let url = location.pathname.slice(1);
      this.showPage(this.$app.find('#' + url), ()=>{
        $(function(){
          window.app.projects.reStart();
        })
      });
    }
    // history url
    // if(history.state){
    //   this.showPage(this.$app.find('#' + history.state.page), ()=>{
    //     $(function(){
    //       window.app.projects.reStart();
    //     })
    //   });
    // }

// console.log(window.app.profolio)
    // window.app.profolio.init();
    // 產生ghost button
    // this.$ghostBtn.map((i,d)=> new gbg(d, this.state, function(newState){
    //   $.extend( ucar.state, newState);
    // }));
    // this.$app.removeClass('hide');
  }

  /*
   *  event bind
   */

  eventListener() {
    const $indexSection = this.$app.find('#KevinHu');
    const $projectsSection = this.$app.find('#projects');
    const $goIndex = this.$app.find('.KevinHu');
    const $goProjects = this.$app.find('.projects');

    // history listen
    $(window).on("popstate", ()=>{
      if(!history.state){
        this.showPage($indexSection);
        return;
      }
      this.showPage(this.$app.find('#' + history.state.page), ()=>{
        // window.app.projects.reStart();
      });
    });

    this.changePage($indexSection, $goIndex, ()=>{
      this.$app.find('section').addClass('hide');
      setTimeout(function(){
        $indexSection.removeClass('hide')
      }, 10);
    });
    // go projects
    this.changePage($projectsSection, $goProjects, ()=>{
      window.app.projects.reStart();
    });
  }

  changePage($page, $trigger, callback) {
      $trigger.off('click').on('click', ()=>{
        this.showPage($page);

        // history push
        if(!history.state || history.state.page !== $trigger.text())
          history.pushState({ 'page': $trigger.text() }, '', $trigger.text());

        if (typeof callback === 'function') {
          callback();
        }
      });
  }

  showPage($page, callback) {
    // $from.fadeOut();
    // $to.fadeIn();
    this.$app.find('section').addClass('hide');
    $page.removeClass('hide');

    if (typeof callback === 'function') {
      callback();
    }
  }
}

export default index;