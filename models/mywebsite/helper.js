'use strict';

module.exports = {
  brief: function() {
    return [
      {
        showEN: "hello, wanna know more !?",
        showTW: "您好, 想要挖掘更多資訊媽 !?"
      }
    ]
  },
  menu: function() {
    return [
      {
        title:  "lang",
        state:  "completed",
        showEN: "/ 中文版",
        showTW: "/ English"
      }, {
        title:  "aboutsite",
        state:  "padding",
        showEN: "about website",
        showTW: "關於<br>這個網站"
      }, {
        title:  "msgboard",
        state:  "completed",
        showEN: "message board",
        showTW: "留言板"
      }, {
        title:  "blog",
        state:  "padding",
        showEN: "blog",
        showTW: "部落格"
      }, {
        title:  "cv",
        state:  "completed",
        showEN: "CV",
        showTW: "簡歷"
      }
    ];
  }
};
