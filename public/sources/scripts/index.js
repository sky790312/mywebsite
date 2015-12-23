'use strict';

// import dynamicLoading from '../scripts/dynamicLoading'; // 進頁面才load好像沒有比較好
import projectJs from '../scripts/project.js';
import aboutmeJs from '../scripts/aboutme.js';

window.app = {};

class index {
  constructor($ele) {

    // this.state = {
    //   prevPage: '',
    //   currentPage: ''
    // };

    this.$app = $ele;

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

    // first into page
    if($(location).attr('pathname')){
      let url = $(location).attr('pathname').replace('/', '');
      this.showPage(this.$app.find('#' + url));
      this.$app.find('.' + url).addClass('active');

      this.startPage(url);
    }

    // history url
    // if(history.state){
    //   this.showPage(this.$app.find('#' + history.state.page), ()=>{
    //     $(function(){
    //       window.app.projects.start();
    //     })
    //   });
    // }

    // ready and show
    this.$app.find('#preloader').addClass('hide');
  }

  /*
   *  event bind
   */

  eventListener() {
    const $indexSection = this.$app.find('#kevinhu');
    // const $projectsSection = this.$app.find('#projects');
    // const $aboutmeSection = this.$app.find('#aboutme');
    // const $backgroundSection = this.$app.find('#background');
    // const $skillsSection = this.$app.find('#skills');
    const $goIndex = this.$app.find('.kevinhu');
    // const $goProjects = this.$app.find('.projects');
    // const $goAboutme = this.$app.find('.aboutme');
    // const $goBackground = this.$app.find('.background');
    // const $goSkills = this.$app.find('.skills');

    const $helper = this.$app.find('#helper');

    // history listen
    $(window).on('popstate', ()=>{
      let url = history.state ?
        history.state.page : $(location).attr('pathname').replace('/', '');
      // if(url === 'aboutme')
        // return;
      this.showPage(this.$app.find('#' + url), ()=> {
        this.afterPage(url);
      });
    });

    // change photo title
    $indexSection.off('click').on('click','.photo', (e)=> {
      let $ele = $(e.target).parent();
      if($ele.hasClass('about-skill')){
        $ele.removeClass('about-skill').addClass('about-brief');
        $ele.find('.tags-brief').removeClass('hide');
        $ele.find('.tags-skill').addClass('hide');
      }else{
        $ele.removeClass('about-brief').addClass('about-skill');
        $ele.find('.tags-brief').addClass('hide');
        $ele.find('.tags-skill').removeClass('hide');
      }
    });

    // about the helper
    $helper.find('.head-boy').off('click').on('click', ()=>{
      if($helper.hasClass('show-helper')){
        this.$app.find('#preloader').addClass('hide');
        $helper.removeClass('show-helper');
      }else{
        this.$app.find('#preloader').removeClass('hide');
        $helper.addClass('show-helper');
      }
    });

    // go menu
    this.bindPage($goIndex.data('menu'));
    this.$app.find('.menu a').each((i, e) =>{
      this.bindPage($(e).data('menu'));
    });
  }

// show page => after page => start page

/* about page control - 未來移出js */

  // click and change page
  bindPage(triggerValue) {
    let $triggerSection = this.$app.find('#' + triggerValue);
    let $triggerMenu = this.$app.find('.' + triggerValue);

    $triggerMenu.off('click').on('click', ()=>{
      if($triggerMenu.hasClass('active')){
        return;
      }

      this.showPage($triggerSection);

      // history push
      if(!history.state || history.state.page !== triggerValue)
        history.pushState({ 'page': triggerValue }, '', triggerValue);

      this.afterPage(triggerValue);

      // if (typeof callback === 'function') {
      //   callback();
      // }
    });
  }

  // show page..need to be first
  showPage($page, callback) {
    // $from.fadeOut();
    // $to.fadeIn();
    this.$app.find('section').addClass('hide');
    $page.removeClass('hide');

    if (typeof callback === 'function') {
      callback();
    }
  }

  // page state init
  afterPage(page) {
    let $ele = this.$app.find('.' + page);
    if($ele.hasClass('active'))
      return;
    if(window.app.projects) {
      window.app.projects.method.closeProfolio(window.app.projects.$section.find('.inside'));
    }
    if(window.app.aboutme) {
      window.app.aboutme.method.stop();
      window.app.aboutme.unbind.offhashchange();
    }
    this.$app.find('.kevinhu').removeClass('active');
    this.$app.find('.menu a').removeClass('active');
    this.$app.find('.menu-list a').removeClass('active');

    $ele.addClass('active');

    this.startPage(page);
  }

  // start page init or restart setting
  startPage(page) {
    switch (page) {
      default:
        break;
      case 'projects':
        if(window.app.projects) {
          window.app.projects.start();
        } else {
          new projectJs();
          // dynamicLoading('projects');
        }
        break;
      case 'aboutme':
        if(window.app.aboutme) {
          window.location.hash = "#who-i-am";
          window.app.aboutme.method.run();
          window.app.aboutme.bind.onhashchange();
        } else {
          new aboutmeJs();
          // dynamicLoading('aboutme');
        }
        break;
    }
  }

}


export default index;