'use strict';

// 取資料部分
var menu = require('../models/mywebsite/menu');
var kevinhu = require('../models/mywebsite/kevinhu');
var projects = require('../models/mywebsite/projects');
var aboutme = require('../models/mywebsite/aboutme');
var background = require('../models/mywebsite/background');
var skills = require('../models/mywebsite/skills');
var helper = require('../models/mywebsite/helper');

// var test = require('../models/mywebsite/test');
// 考慮hide data attribute

// router部分
exports.index = function(req, res){
  var data = {
    // datatest: {
      // menuObj: test.menu()
    // },
    menuObj: menu,
  	kevinhuObj: kevinhu,
  	projectsObj: projects,
  	aboutmeObj: aboutme,
  	backgroundObj: background,
  	skillsObj: skills,
  	helperObj: helper
  };

  res.render('./mywebsite/index', data);
  res.end();
};




