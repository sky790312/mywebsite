'use strict';

// 處理時間格式
export default function handleDateFormat(inputDate){
  const daysArr = ["(日)","(一)","(二)","(三)","(四)","(五)","(六)"];
  let dateObj = {};
  let date = inputDate ? new Date(inputDate) : new Date();
  let day = (date.getDate()>9)?date.getDate():("0" + date.getDate());
  let month = ((date.getMonth()+1)>9)?(date.getMonth()+1):("0" + (date.getMonth()+1));
  let year = date.getFullYear();
  const dateValue =  year.toString() + month.toString() + day.toString();
  const dateUI = year.toString() + "-" + month.toString() + "-" + day.toString() + "" + daysArr[date.getDay()];
  dateObj = {
    dateValue: dateValue,
    dateUI: dateUI
  };
  return dateObj;
}
