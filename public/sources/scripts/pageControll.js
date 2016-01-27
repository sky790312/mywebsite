'use strict';

import projectJs from '../scripts/project.js';
import aboutmeJs from '../scripts/aboutme.js';

// show page => after page => start page
class pageControll {
  constructor($app, window) {
    this.$app = $app;

    // bind event - all move to index.js controll
    // this.bindPage();

    this.$app.find('.main-menu.aboutme').parent().addClass('hide');

    window.app.loading = 50;
    // console.log(window.app.loading)
  }

  // click and change page
  bindPage() {
    this.$app.find('#header').on('click', '.main-menu', (e)=>{
      let $ele = $(e.target);
      let triggerValue = $ele.data('menu');
      let $triggerSection = this.$app.find('#' + triggerValue);

      if($ele.hasClass('active')){
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

  // exception: move about outside page..
  bindAbout(callback) {
    let aboutme = 'aboutme';
    let insidePage = window.location.hash;

    if(insidePage === '#who-i-am' && typeof callback === 'function'){
      callback();
      return;
    }

    this.showPage(this.$app.find('#aboutme'));

    // history push
    if(!history.state || history.state.page !== aboutme)
      history.pushState({ 'page': aboutme }, '', aboutme);

    if(window.app.aboutme) {
      window.location.hash = "#who-i-am";
    } else {
      this.afterPage(aboutme);
    }
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

    this.$app.find('.main-menu').removeClass('active');
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
          new projectJs(window);
          // dynamicLoading('projects');
        }
        break;
      case 'aboutme':
        if(window.app.aboutme) {
          window.location.hash = "#who-i-am";
          window.app.aboutme.method.run();
          window.app.aboutme.bind.onhashchange();
        } else {
          new aboutmeJs(window);
          // dynamicLoading('aboutme');
        }
        break;
    }
  }
}

export default pageControll;



