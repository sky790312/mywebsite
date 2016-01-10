'use strict';

import 'normalize.css';
import '../scss/index.scss';

import index from '../scripts/index.js';

// import FastClick from 'fastclick';
// FastClick.attach(document.body);

window.index = index;

new index($('#app'));

// style console
let consoleText = "welcome to KevinHu's website!";
let consoleStyle = '\
						font-size: 20px; \
						background-color: red; \
						font-weight: bold; \
						color: white; \
						text-shadow: 0 0 1em black, 0 0 1em black, 0 0 1em black, 0 0 1em black, 0 0 1em black; \
						padding: 3px 5%; \
						border: .1em solid rgba(0,0,0,.4); \
						border-radius: 1em; \
					';
console.log('%c' + consoleText, consoleStyle);