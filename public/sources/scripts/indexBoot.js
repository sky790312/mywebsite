'use strict';

import 'normalize.css';
import '../scss/index.scss';

import index from '../scripts/index.js';

// import FastClick from 'fastclick';
// FastClick.attach(document.body);

window.index = index;

new index($('#app'));
