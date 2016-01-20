'use strict';

// show page => after page => start page
class utils {
  constructor(window) {
    window.app.loading = 25;
    // console.log(window.app.loading)
  }

  // set cookie
  setCookie(name, value, days) {
    let expires;
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  // get cookie
  getCookie(c_name) {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=");
        let c_end;
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
  }

  // fb init
  initFb() {
    let d = document;
    let s = 'script';
    let id = 'facebook-jssdk';
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.5&appId=808398882620079';
    fjs.parentNode.insertBefore(js, fjs);
  }
}

// var everythingLoaded = setInterval(function() {
//  console.log(document.readyState);
//  // console.log(window.app.loading);
//   if (/loaded|complete/.test(document.readyState)) {
//     clearInterval(everythingLoaded);
//     $('#helper-background').addClass('hide');
//     // init(); // this is the function that gets called when everything is loaded
//   }
// }, 10);

export default utils;