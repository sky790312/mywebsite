'use strict';
var request = require('request');
var http = require('http');
//request 相關說明請見 https://github.com/mikeal/request

var tag = "test";

// var requestHandler = require('../models/common/requestHandler');
//   func: function(baseUrl, callback) {

//     var uri = baseUrl + 'rest/v1/nationality';

//     requestHandler.get(uri, 30000, "ARR", callback, function (json) {
//       callback(200, json);
//     });

//   },

function requestResponse (error, response, body, type, callback, thisCallback) {

  // console.log("time " + new Date());
  // console.log("----");
  // console.log(JSON.stringify(body));

  if (!error) {

    if (!body) {
      if (tag == "test" || tag == "ws") {
        callback(500, {"err": "server error"});
      } else {
        callback(500);
      }     
      return;
    }

    if (body.status) {
      if (body.status != 200) {
        if (body.errors) {
          if (tag == "test" || tag == "ws") {
            callback(body.status, body.errors);
          } else {
            callback(500);
          } 
        } else {
          if (tag == "test" || tag == "ws") {
            callback(body.status, body);
          } else {
            callback(500);
          } 
        }
        return;
      }
    }

    if (!body.items) {
      if (tag == "test" || tag == "ws") {
        callback(500,{"error":"no items"});
      } else {
        callback(500);
      } 
      return;
    }

    if (type == "OBJ") {
      if (!body.items[0]) {
        if (tag == "test" || tag == "ws") {
          callback(500, {"error": "items[0] is null"});
        } else {
          callback(500);
        } 
        return;
      }

      if (body.items[0] == null || body.items[0] == "null") {
        if (tag == "test" || tag == "ws") {
          callback(500, {"error": "items[0] is null"});
        } else {
          callback(500);
        } 
        return;
      }
    };

    if (type == "ARR") {
      var json = body.items;
    } else if (type == "OBJ") {
      var json = body.items[0];
    }

    thisCallback(json);

  }else {
    if (tag == "test" || tag == "ws") {
      callback(500, {"err": error});
    } else {
      callback(500);
    } 
  }

}

var appRequest = {

  get: function(uri, timeout, type, callback, thisCallback) {
    
    // console.log("time " + new Date());
    // console.log("go to ---");
    // console.log(uri);
    // console.log("---");

    request({
      uri: uri,
      json: true,
      timeout: timeout,
      headers: {}
    }, function(error, response, body) {

      requestResponse (error, response, body, type, callback, thisCallback);

    });

  },
  post: function(uri, requestBody, timeout, type, callback, thisCallback) {

    // console.log("time " + new Date());
    // console.log("go to ---");
    // console.log(uri);
    // console.log("---");
    // console.log(requestBody);
    // console.log("---");

    request({
      uri: uri,
      method: 'POST',
      body: requestBody,
      json: true,
      timeout: timeout,
      headers: {'Content-Type': 'application/json'}
    }, function(error, response, body) {

      requestResponse (error, response, body, type, callback, thisCallback);

    });

  }

};

module.exports = appRequest;