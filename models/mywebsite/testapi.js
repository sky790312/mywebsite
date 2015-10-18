'use strict';

var request = require('request');
// var ezRequest = require('../utils/requestHandler');
var baseUrl = "testdataurl/";

// exports.hsrResults = {
//   getList: function(params, callback) {
//     var url = "";
//     var sArr = [];
//     sArr[sArr.length] = baseUrl;
//     sArr[sArr.length] = "test?";
//     sArr[sArr.length] = "date=" + params.date;
//     sArr[sArr.length] = "&";
//     sArr[sArr.length] = "from=" + params.from;
//     sArr[sArr.length] = "&";
//     sArr[sArr.length] = "to=" + params.to;
//     sArr[sArr.length] = "&";
//     sArr[sArr.length] = "carClass=" + params.carClass;
//     sArr[sArr.length] = "&";
//     sArr[sArr.length] = "ticketQty=" + params.ticketQty;
//     sArr[sArr.length] = "&";
//     sArr[sArr.length] = "fareType=" + params.fareType;
//     url = sArr.join('');
//     request(url, function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         callback(JSON.parse(body));
//       }
//     });
//   },
// };
