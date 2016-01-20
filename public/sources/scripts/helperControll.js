'use strict';

import utilsJs from '../scripts/utils.js';

// show page => after page => start page
class helperControll {
  constructor($app) {
    this.$app = $app;
    this.utils = new utilsJs();

    // bind event - all move to index.js controll
    // this.bindHelper();
    // this.bindBoard();
    // this.bindHelperMenu();

    window.app.loading = 75;
    // console.log(window.app.loading)
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
  // show board
  showMsgBoard() {
    this.$app.addClass('hide-scroll');
    this.$app.find('#helper').addClass('show-board');
  }
  // hide board
  hideMsgBoard() {
    this.$app.removeClass('hide-scroll');
    this.$app.find('#helper').removeClass('show-board');
  }
  // bind board close
  bindMsgBoard() {
    this.$app.find('.fb-close').off('click').on('click', ()=>{
      this.hideMsgBoard();
    });
  }
  // bind helper
  bindHelper() {
    let $helper = this.$app.find('#helper');
    $helper.find('.head-boy').off('click').on('click', ()=>{
      // if($helper.hasClass('show-board'))
        // return;
      ($helper.hasClass('show-helper') ? this.hideHelper() : this.showHelper());
    });
  }
  // bind helper menu
  bindHelperMenu() {
    this.$app.find('.helper-menu').off('click').on('click', '.menu-item', (e)=>{
      let $ele = $(e.target.parentNode);
      if($ele.hasClass('padding') || $ele.hasClass('disabled'))
        return;
      switch ($ele.attr('id')) {
        default:
          break;
        case 'lang':
          (this.utils.getCookie('lg') === 'en') ? this.utils.setCookie('lg', 'tw') : this.utils.setCookie('lg', 'en');
          this.setLanguage(this.utils.getCookie('lg'));
          this.hideHelper();
          break;
        case 'msgboard':
          if (typeof FB === 'undefined') {
            this.utils.initFb();

            let fbCheck = setInterval(()=>{
                if (typeof FB !== 'undefined' && !$('.fb-like').is(':empty') && !$('.fb-comments').is(':empty')) {
                  this.showMsgBoard();
                  clearInterval(fbCheck);
                }
            }, 100);
          } else {
            this.showMsgBoard();
          }
          break;
        case 'cv':
          window.open('cv-english.pdf');
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