'use strict';

// mobile controll - padding (too many things and problem in mobile need to do..
// so.. sorry, mobile is dead in this project..QQ)

import fastClick from 'fastclick';

// show page => after page => start page
class mobileControll {
  constructor($app, window) {
    this.$app = $app;

    // mobile controll setting just putting in this file now.. ( mobile is padding )
    if(this.checkMobile()) {
      fastClick.attach(document.body);
      this.mMenuClick();
    };

    window.app.loading = 90;
    // console.log(window.app.loading)
  }
  // check mobile
  checkMobile() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true;
    }
  }
  // mobile menu click
  mMenuClick() {
    this.$app.find('.mobile-menu').on('click', '.main-menu', (e)=>{
      // hide mobile menu
      this.$app.find('.mobile-menu .checkbox-toggle').prop('checked', false);
    });
  }
}

export default mobileControll;