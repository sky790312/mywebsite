'use strict';

import utilsJs from '../scripts/utils.js';

// show page => after page => start page
class helperControll {
  constructor($app) {
    this.$app = $app;
    this.utils = new utilsJs();
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
      if($helper.hasClass('show-board'))
        return;
      ($helper.hasClass('show-helper') ? this.hideHelper() : this.showHelper());
    });
  }

  // helper menu
  bindHelperMenu(triggerValue) {
    let $triggerMenu = this.$app.find('#' + triggerValue);

    $triggerMenu.off('click').on('click', ()=>{
      if($triggerMenu.hasClass('padding') || $triggerMenu.hasClass('disabled'))
        return;
      switch (triggerValue) {
        default:
          break;
        case 'lang':
          (this.utils.getCookie('lg') === 'en') ? this.utils.setCookie('lg', 'tw') : this.utils.setCookie('lg', 'en');
          this.setLanguage(this.utils.getCookie('lg'));
          this.hideHelper();
          break;
        case 'msgboard':
          if($triggerMenu.hasClass('active')){
            this.$app.find('#helper').removeClass('show-board');
            this.$app.find('.helper-menu a').removeClass('disabled');
            $triggerMenu.removeClass('active');
          }else{
            this.$app.find('#helper').addClass('show-board');
            this.$app.find('.helper-menu a').addClass('disabled');
            $triggerMenu.removeClass('disabled').addClass('active');
          }
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

  //helper menu - show fb comments board
  showCommentsBoard() {

  }
}

export default helperControll;