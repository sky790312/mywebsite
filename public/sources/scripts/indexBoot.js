'use strict';

import 'normalize.css';
import '../scss/index.scss';

// import FastClick from 'fastclick';
// import prjectsJs from '../scripts/profolio-presentation.js';
// import '../scripts/test.js';
// new prjectsJs();
import '../scripts/aboutme.js';
import index from '../scripts/index.js';

// FastClick.attach(document.body);

window.index = index;

new index($('#app'));
