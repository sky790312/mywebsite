'use strict';

// 取資料部分
var menu = require('../models/mywebsite/menu');
var kevinhu = require('../models/mywebsite/kevinhu');
var projects = require('../models/mywebsite/projects');
var aboutme = require('../models/mywebsite/aboutme');
var background = require('../models/mywebsite/background');
var skills = require('../models/mywebsite/skills');
var helper = require('../models/mywebsite/helper');

// router部分
exports.index = function(req, res){
  var data = {
    menuObj: menu,
  	kevinhuObj: kevinhu,
  	projectsObj: projects,
  	aboutmeObj: aboutme,
  	backgroundObj: background,
  	skillsObj: skills,
  	helperObj: helper
  };
  for(var i = 0; i < projects.projects().length; i++){
console.log(projects.projects()[i])
  }
  res.render('./mywebsite/index', data);
  res.end();
};

// exports.projects = function(req, res){
//   // var data = {
//   //   departures: myModel.getDeparture(),
//   //   dest: myModel.getDest()
//   // };
//   res.render('./mywebsite/projects');
//   res.end();
// };

// ***** 高鐵APIs *****
// 高鐵列表
// exports.hsrSearch = function(req, res){
//   var params = {
//     date: req.query.date,
//     from: req.query.from,
//     to: req.query.to,
//     carClass: req.query.carClass,
//     ticketQty: req.query.ticketQty,
//     fareType: req.query.fareType,
//   };
//   hsrSearch.hsrResults.getList(params, function(d){
//     res.json(d);
//   });
// };





