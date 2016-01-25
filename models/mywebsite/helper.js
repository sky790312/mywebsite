'use strict';

module.exports = {
  brief: function() {
    return [
      {
        showEN: "hello, try something interesting !?",
        showTW: "您好, 要不要試試看有趣的東西 !?"
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
