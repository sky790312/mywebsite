'use strict';

module.exports = {
  en: function() {
    return [
      {
        name: 'projects'
      }, {
        name: 'aboutme'
      }, {
        name: 'background'
      }, {
        name: 'skills'
      }
    ];
  },
  tw: function() {
    return [
      {
        name: '作品集'
      }, {
        name: '關於我'
      }, {
        name: '學經歷'
      }, {
        name: '職技能'
      }
    ];
  },
  menu: function() {
    return [
      {
        showEN: 'projects',
        showTW: '作品集'
      }, {
        showEN: 'aboutme',
        showTW: '關於我'
      }, {
        showEN: 'background',
        showTW: '學經歷'
      }, {
        showEN: 'skills',
        showTW: '職技能'
      }
    ];
  }
};
