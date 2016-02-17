'use strict';

// import dynamicLoading from '../scripts/dynamicLoading'; // 進頁面才load好像沒有比較好

import utilsJs from '../scripts/utils.js';
import pageJs from '../scripts/pageControll.js';
import helperJs from '../scripts/helperControll.js';
import keyControllJs from '../scripts/keyControll.js';
import mobileControllJs from '../scripts/mobileControll.js';

// window.app = {};

class index {
  constructor($ele, window) {

    // this.state = {
    //   prevPage: '',
    //   currentPage: ''
    // };

    this.$app = $ele;

    this.utils          = new utilsJs(this.$app, window);
    this.pageControll   = new pageJs(this.$app, window);
    this.helperControll = new helperJs(this.$app, window);
    this.keyControll    = new keyControllJs(this.$app, window);
    this.mobileControll = new mobileControllJs(this.$app, window);

    this.init();
    this.eventListener();

    window.app.loading = 100;
    // console.log(window.app.loading)
  }

  /*
   *  init 頁面
   */

  init() {
    // const app = this;

    // $.extend(this.state, {

    // });

    if($(window.location).attr('pathname') === '/') {
      $(window.location).attr('pathname', '/kevinhu');
    }

    let url = $(window.location).attr('pathname').replace('/', '').toLowerCase();
    this.pageControll.showPage(this.$app.find('#' + url));
    this.$app.find('.' + url).addClass('active');

    this.pageControll.startPage(url);

    if(!this.utils.getCookie('lg')) {
      this.utils.setCookie('lg', 'en');
    }
    this.helperControll.setLanguage(this.utils.getCookie('lg'));

    // ready and show
    // this.$app.find('#helper-background').addClass('hide');
  }

  /*
   *  event bind
   */

  eventListener() {
    // history listen
    $(window).on('popstate', ()=>{
      let url = history.state ?
        history.state.page : $(window.location).attr('pathname').replace('/', '').toLowerCase();

      this.pageControll.showPage(this.$app.find('#' + url), ()=> {
        this.pageControll.afterPage(url);
      });

      // hide helper if showing
      if(this.$app.find('#helper').hasClass('show-helper')){
        this.helperControll.hideHelper();
      }
    });

    // bind page - pageControll
    this.pageControll.bindPage();
    // bind helper - helperControll
    this.helperControll.bindHelper();
    // bind helper menu - helperControll
    this.helperControll.bindHelperMenu();
    // bind helper msg board - helperControll
    this.helperControll.bindMsgBoard();
    // bind key press event - keyControll
    this.keyControll.bindKeypress();
    // bind key click event - keyControll
    this.keyControll.bindClickKeys();

    // change photo title
    // $indexSection.off('click').on('click','.photo', (e)=> {
    //   let $ele = $(e.target).parent();
    //   if($ele.hasClass('about-skill')){
    //     $ele.removeClass('about-skill').addClass('about-brief');
    //     $ele.find('.tags-brief').removeClass('hide');
    //     $ele.find('.tags-skill').addClass('hide');
    //   }else{
    //     $ele.removeClass('about-brief').addClass('about-skill');
    //     $ele.find('.tags-brief').addClass('hide');
    //     $ele.find('.tags-skill').removeClass('hide');
    //   }
    // });
  }
}

export default index;