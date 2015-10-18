'use strict';

module.exports = {
  // 取得出發地
  getDeparture: function(){
    var items = [
      {
        id: "TAIPEI",
        location: "台北高鐵站",
        cityCode: "TPI",
        cityName: "台北"
      },      {
        id: "BANQIAO",
        location: "板橋高鐵站",
        cityCode: "",
        cityName: "板橋"
      },      {
        id: "TAOYUAN",
        location: "桃園高鐵站",
        cityCode: "",
        cityName: "桃園"
      },      {
        id: "HSINCHU",
        location: "新竹高鐵站",
        cityCode: "",
        cityName: "新竹"
      },
      {
        id: "TAICHUNG",
        location: "台中高鐵站",
        cityCode: "",
        cityName: "台中"
      },
      {
        id: "CHIAYI",
        location: "嘉義高鐵站",
        cityCode: "",
        cityName: "嘉義"
      }
    ];
    return items;

  },
  getDest: function(){
    return [
      {
        id: "TAINAN",
        location: "台南高鐵站",
        cityCode: "TNN",
        cityName: "台南"
      }
    ];
  },
  getTestModel: function( uri){
    console.log(uri);
    //request(baseUrl, function (error, response, body) {
    //  if (!error && response.statusCode == 200) {
    //    var data = JSON.parse(body);
    //    testModel.hsrProducts = data;
    //  }
    //});
  }
};
