'use strict';

// import dynamicLoading from '../scripts/dynamicLoading'; // 進頁面才load好像沒有比較好

import utilsJs from '../scripts/utils.js';
import pageJs from '../scripts/pageControll.js';
import helperJs from '../scripts/helperControll.js';

// window.app = {};

class index {
  constructor($ele) {

    // this.state = {
    //   prevPage: '',
    //   currentPage: ''
    // };

    this.$app = $ele;

    this.utils = new utilsJs();
    this.pageControll = new pageJs(this.$app);
    this.helperControll = new helperJs(this.$app);

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

    if($(location).attr('pathname') === '/') {
      $(location).attr('pathname', '/kevinhu');
    }

    let url = $(location).attr('pathname').replace('/', '').toLowerCase();
    this.pageControll.showPage(this.$app.find('#' + url));
    this.$app.find('.' + url).addClass('active');

    this.pageControll.startPage(url);

    if(!this.utils.getCookie('lg')) {
      this.utils.setCookie('lg', 'en');
    }
    this.helperControll.setLanguage(this.utils.getCookie('lg'));

    // ready and show
    this.$app.find('#helper-background').addClass('hide');
  }

  /*
   *  event bind
   */

  eventListener() {
    const $indexSection = this.$app.find('#kevinhu');
    const $goIndex = this.$app.find('.kevinhu');

    // history listen
    $(window).on('popstate', ()=>{
      let url = history.state ?
        history.state.page : $(location).attr('pathname').replace('/', '');

      this.pageControll.showPage(this.$app.find('#' + url), ()=> {
        this.pageControll.afterPage(url);
      });

      // hide helper
      if(this.$app.find('#helper').hasClass('show-helper')){
        this.helperControll.hideHelper();
      }
    });

    // bind helper
    this.helperControll.bindHelper();

    // bind helper menu
    this.$app.find('.helper-menu .menu-item').each((i, e) =>{
      this.helperControll.bindHelperMenu($(e).prop('id'));
    });

    // bind page menu
    this.pageControll.bindPage($goIndex.data('menu'));
    this.$app.find('.menu a').each((i, e) =>{
      this.pageControll.bindPage($(e).data('menu'));
    });

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