'use strict';

module.exports = {
  backend: function() {
    return [
      {
        title: "awsec2",
        show: "awsec2"
      }, {
        title: "nginx",
        show: "nginx"
      }, {
        title: "mysql",
        show: "mysql"
      }, {
        title: "nodejs",
        show: "nodejs"
      }, {
        title: "ror",
        show: "ruby on rails"
      }, {
        title: "play",
        show: "play"
      }, {
        title: "wordpress",
        show: "wordpress"
      }, {
        title: "joomla",
        show: "joomla"
      }, {
        title: "version-controll",
        show: "git/svn"
      }, {
        title: "jenkins",
        show: "jenkins"
      }
    ]
  },
  frontend: function() {
    return [
      {
        title: "html5",
        show: "html5"
      }, {
        title: "webpack",
        show: "webpack"
      }, {
        title: "rwd",
        show: "rwd"
      }, {
        title: "bootstrap",
        show: "bootatrap"
      }, {
        title: "css3",
        show: "css3"
      }, {
        title: "ga",
        show: "ga"
      }, {
        title: "es6",
        show: "es6"
      }, {
        title: "css-framework",
        show: "sass/scss/less"
      }, {
        title: "reactjs",
        show: "reactjs"
      }, {
        title: "object-oriented",
        show: "object oriented"
      }, {
        title: "ajax",
        show: "ajax"
      }, {
        title: "jquery",
        show: "jquery"
      }, {
        title: "open-third-api",
        show: "open third api"
      }, {
        title: "cross-browser",
        show: "cross browser"
      }, {
        title: "javascript",
        show: "javascript"
      }, {
        title: "angularjs",
        show: "angularjs"
      }
    ]
  },
  desc: function() {
    return [
      {
        briefEN: "Explain and Clarify problems, ability to get the Heart of the Matter.",
        briefTW: "清楚地解析問題並找出問題的核心"
      }, {
        briefEN: "Basic design thinking, knowledge about backend, linux, computer science, web's world.",
        briefTW: "同理思考站在設計, 後端角度思考 web 領域與知識"
      }, {
        briefEN: "Familiarity with Object-Oriented Programming, pure javaScript, design pattern, librarys, frameworks.",
        briefTW: "物件導向, design pattern與純javascript能力, library與framework"
      }, {
        briefEN: "Soft communication to works closely with designers, backend developers and product owners.",
        briefTW: "有效的與設計, 後端, 產品端溝通給予建立並不失立場"
      }, {
        briefEN: "Knowledge of relative buildng tools to make strong frontend development.",
        briefTW: "work flow & 開發上相關的工具與能力"
      }
    ];
  },
  levelBlock: function() {
    return [
      {
        briefEN: "Begineer",
        briefTW: "初學"
      }, {
        briefEN: "Familiar",
        briefTW: "熟悉"
      }, {
        briefEN: "Proficient",
        briefTW: "專精"
      }, {
        briefEN: "Expert",
        briefTW: "大師"
      }
    ];
  },
  levelSkill: function() {
    return [
      {
        percent: "70",
        title: "HTML5"
      }, {
        percent: "70",
        title: "pure JS"
      }, {
        percent: "80",
        title: "jQuery"
      }, {
        percent: "65",
        title: "AngularJS"
      }, {
        percent: "35",
        title: "React"
      }, {
        percent: "65",
        title: "CSS3"
      }, {
        percent: "65",
        title: "Sass / Less"
      }, {
        percent: "70",
        title: "Bootstrap"
      }, {
        percent: "70",
        title: "CMS"
      }, {
        percent: "45",
        title: "backend skill"
      }, {
        percent: "70",
        title: "relative tools"
      }
    ];
  }
};
