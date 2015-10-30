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

    // console.log($(location).attr('pathname'))
    // console.log(history.state)
    // new page url check
    if($(location).attr('pathname')){
      let url = $(location).attr('pathname').slice(1);
      this.showPage(this.$app.find('#' + url), ()=>{
        // dom ready
        $(()=>{
          this.afterPage(url);
        })
      });
    }
    // history url
    // if(history.state){
    //   this.showPage(this.$app.find('#' + history.state.page), ()=>{
    //     $(function(){
    //       window.app.projects.start();
    //     })
    //   });
    // }

// console.log(window.app.profolio)
    // window.app.profolio.init();
    // 產生ghost button
    // this.$ghostBtn.map((i,d)=> new gbg(d, this.state, function(newState){
    //   $.extend( ucar.state, newState);
    // }));

    // ready and show
    // this.$app.removeClass('hide');
    this.$app.find('#preloader').addClass('hide');
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
      let url = history.state ? history.state.page : $(location).attr('pathname').slice(1);
      this.showPage(this.$app.find('#' + url), ()=>{
        // this.$app.find('.' + history.state.page).addClass('active');
        this.afterPage(url);
      });
    });

    this.clickPage($indexSection, $goIndex, ()=>{
      // this.showPage($indexSection);
      this.afterPage('KevinHu');
    });
    // go projects
    this.clickPage($projectsSection, $goProjects, ()=>{
      // window.app.projects.start();
      this.afterPage('projects');
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

  afterPage(page) {
    switch (page) {
      default:
        break;
      case 'projects':
        window.app.projects.start();
        break;
    }
  }

  // click and change page
  clickPage($page, $trigger, callback) {
    $trigger.off('click').on('click', ()=>{
      // if($trigger.hasClass('active'))
        // return;
      // $trigger.addClass('active');
      this.showPage($page);
      // history push
      if(!history.state || history.state.page !== $trigger.text())
        history.pushState({ 'page': $trigger.text() }, '', $trigger.text());

      if (typeof callback === 'function') {
        callback();
      }
    });
  }
}

export default index;