'use strict';

import projectJs from '../scripts/project.js';
import aboutmeJs from '../scripts/aboutme.js';

// show page => after page => start page
class pageControll {
  constructor($app) {
    this.$app = $app;

    window.app.loading = 50;
    // console.log(window.app.loading)
  }

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

export default pageControll;



