'use strict';

// not use now..

export default function dynamicLoading(page, callback) {
  switch (page) {
    default:
      break;
    case 'projects':
      require.ensure([], function() { // this syntax is weird but it works
        // showloading();
        const projects = require('../scripts/profolio-presentation.js'); // when this function is called, the module is guaranteed to be synchronously available.
        new projects();
        // hideloading();
      });
      break;
    case 'aboutme':
      require.ensure([], function() { // this syntax is weird but it works
        // showloading();
        const aboutme = require('../scripts/aboutme.js'); // when this function is called, the module is guaranteed to be synchronously available.
        new aboutme();
        // hideloading();
      });
      break;
  }
  if (typeof callback === 'function') {
    callback();
  }
}
