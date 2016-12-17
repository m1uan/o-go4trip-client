var swig  = require('swig');
var mkpath = require('mkpath');
var fs = require('fs');
var util = require('util')
var exec = require('child_process').exec;
var htmlparser = require("htmlparser2");
var jsonminify = require("jsonminify");
        
var SRC_DIR = "./src/app/";


var param_template = '--template=';
var param_force = '--force';

var template = '';
var name = null;
var product_id = null;
var parent = '../';
var force = false;

var done = [false, false, false, false];

process.argv.forEach(function (val, index, array) {
  if(index > 1 && !product_id){
      product_id = val;
      
      console.log('product-id:', product_id);
      
      
  } 
 
});

var totalCount = 1000;

for(var i = 1; i < 30; i++){
     movementInDay(i);
}

function movementInDay(i){
    var rand = getRandomInt(1)+2;
    
    for(var i2 = 0; i2 < rand; i2++){
        var randHour = getRandomInt(23);
        var randMinute = getRandomInt(59);
        var randSecond = getRandomInt(59);
        var randMovement = getRandomInt(4)+1;
        
        totalCount -= randMovement;
        
        console.log("INSERT INTO `ful_stock_log` (`product_id`, `state`, `actual`, `movement`, `timestamp`, `total_price`, `total_sell_price`) VALUES "
                + "('"
                + product_id+"', '2', '"
                + totalCount+"', '"
                + randMovement+"', '2016-07-"
                + doubleNumber(i)+" "
                + doubleNumber(randHour)+":"
                + doubleNumber(randMinute)+":"
                + doubleNumber(randSecond)+"', 100, 200);");    
    }
     
}

function doubleNumber(n){
    if(n<10){
        return '0' + n;
    } else {
        return n;
    }
}

function getRandomInt(max) {
  var min = 0;
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}