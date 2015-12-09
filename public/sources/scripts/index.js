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
    const $indexSection = this.$app.find('#KevinHu');
    const $projectsSection = this.$app.find('#projects');
    const $aboutmeSection = this.$app.find('#aboutme');
    const $backgroundSection = this.$app.find('#background');
    const $skillsSection = this.$app.find('#skills');
    const $goIndex = this.$app.find('.KevinHu');
    const $goProjects = this.$app.find('.projects');
    const $goAboutme = this.$app.find('.aboutme');
    const $goBackground = this.$app.find('.background');
    const $goSkills = this.$app.find('.skills');

    // history listen
    $(window).on("popstate", ()=>{
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
    // go index kevinhu
    this.changePage($indexSection, $goIndex, ()=> {
      this.afterPage('KevinHu');
    });
    // go projects
    this.changePage($projectsSection, $goProjects, ()=> {
      this.afterPage('projects');
    });
    // go aboutme
    this.changePage($aboutmeSection, $goAboutme, ()=> {
      this.afterPage('aboutme');
    });
    // go background
    this.changePage($backgroundSection, $goBackground, ()=> {
      this.afterPage('background');
    });
    // go skills
    this.changePage($skillsSection, $goSkills, ()=> {
      this.afterPage('skills');
    });
  }

// change page => show page => after page => start page

/* about page control - 未來移出js */

  // click and change page
  changePage($page, $trigger, callback) {
    $trigger.off('click').on('click', ()=>{
      if($trigger.hasClass('active'))
        return;

      this.showPage($page);
      // history push
      if(!history.state || history.state.page !== $trigger.text())
        history.pushState({ 'page': $trigger.text() }, '', $trigger.text());

      if (typeof callback === 'function') {
        callback();
      }
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
    this.$app.find('.KevinHu').removeClass('active');
    this.$app.find('.menu a').removeClass('active');

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