'use strict';

import utilsJs from '../scripts/utils.js';

// show page => after page => start page
class helperControll {
  constructor($app) {
    this.$app = $app;
    // this.utils = new utilsJs();
  }

  // show helper
  showHelper() {
    this.$app.find('#helper-background').removeClass('hide');
    this.$app.find('#helper').addClass('show-helper');
  }

  // hide helper
  hideHelper() {
    this.$app.find('#helper-background').addClass('hide');
    this.$app.find('#helper').removeClass('show-helper');
  }

  // helper
  bindHelper() {
    let $helper = this.$app.find('#helper');
    $helper.find('.head-boy').off('click').on('click', ()=>{
      ($helper.hasClass('show-helper') ? this.hideHelper() : this.showHelper());
    });
  }

  // helper menu
  bindHelperMenu(triggerValue) {
    let $triggerMenu = this.$app.find('#' + triggerValue);

    $triggerMenu.off('click').on('click', ()=>{
      switch (triggerValue) {
        default:
          break;
        case 'lang':
          (this.utils.getCookie('lg') === 'en') ? this.utils.setCookie('lg', 'tw') : this.utils.setCookie('lg', 'en');
          this.setLanguage(this.utils.getCookie('lg'));
          this.hideHelper();
          break;
      }
    });
  }

  // helper menu - set language
  setLanguage(lang) {
    this.$app.find('.lg').each((i, e) =>{
      let $ele = $(e);
      (lang === 'en') ? $ele.html($ele.data('en')) : $ele.html($ele.data('tw'));
    });
  }
}

export default helperControll;