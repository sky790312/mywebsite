'use strict';

// 取資料部分
var menu = require('../models/mywebsite/menu');

// router部分
exports.index = function(req, res){
  var data = {
    	menu: menu
  };
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





