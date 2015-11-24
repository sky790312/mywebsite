'use strict';

import dynamicLoading from '../scripts/dynamicLoading';

window.app = {};

class index {
  constructor($ele) {
    // settings
    this.state = {
      prevPage: '',
      currentPage: ''
    };

    // //選取元素
    this.$app = $ele;

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
        history.state.page : $(location).attr('pathname').slice(1);
      // if(url === 'aboutme')
        // return;
      this.showPage(this.$app.find('#' + url), ()=> {
        // this.$app.find('.' + history.state.page).addClass('active');
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

// change page => show page => after page

/* about page control - 未來移出js */
  showPage($page, callback) {
    // $from.fadeOut();
    // $to.fadeIn();
    this.$app.find('section').addClass('hide');
    $page.removeClass('hide');

    if (typeof callback === 'function') {
      callback();
    }
  }

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

  // page setting
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

    switch (page) {
      default:
        break;
      case 'projects':
        if(window.app.projects) {
          window.app.projects.start();
        } else {
          dynamicLoading('projects');
        }
        break;
      case 'aboutme':
        if(window.app.aboutme) {
          window.location.hash = "#who-i-am";
          window.app.aboutme.method.run();
          window.app.aboutme.bind.onhashchange();
        } else {
          dynamicLoading('aboutme');
        }
        break;
    }
  }
}

export default index;