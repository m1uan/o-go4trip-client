/*
 npm run translator home/header.html && npm run translator home/profile/profile.html &&  npm run translator home/profile/pickup/pickup.html && npm run translator home/profile/pickup/collection-place-modal/collection-place-modal.html && npm run translator home/profile/pickup/first-pickup-modal/first-pickup-modal.html && npm run translator profile/pickup/pickup-modal/pickup-modal.html

*/


var swig  = require('swig');
var mkpath = require('mkpath');
var fs = require('fs');
var util = require('util')
var exec = require('child_process').exec;
var htmlparser = require("htmlparser2");
var jsonminify = require("jsonminify");
        
var SRC_DIR = "./src/app/";

var HELPKEY = '213xWR.ce'

var param_template = '--template=';
var param_sql = '--sql';
var param_csv = '--csv';

var template = '';
var name = null;
var location = null;
var parent = '../';
var SQL = false;
var CSV = false;

var done = [false, false, false, false];

var jsonFILE = './src/business/assets/i18n/cz.json';

process.argv.forEach(function (val, index, array) {
  if(val.startsWith(param_template)){
      template = val.substr(param_template.length)
      
      
  } else if(val.startsWith(param_sql)){
      // rewrite files even they are exists
      SQL = true;
      
  } else if(val.startsWith(param_csv)){
      // rewrite files even they are exists
      CSV = true;
      
  } else if(index > 1 && !location){
      location = val;
      
      var haveDir = location.lastIndexOf('/');
      console.log('location', location);
      
      
  } 
  console.log(index + ':location: ' + val); 
});


var name = SRC_DIR+location;
var CZ = null;
var doclocation = null;

fs.readFile(jsonFILE, function (czerr, czdata) {
    if (czerr) {
        throw czerr; 
    }
    
    CZ = JSON.parse(jsonminify(czdata.toString()));
    
    if(SQL){
        for(var key in CZ){
            //if(CZ[key] == text){
                console.log("delete from `ci_languages_phrases` WHERE `key`='" + key + "';");
                console.log("insert into `ci_languages_phrases` (`key`, `language`, `locale`, `text`) VALUES ('" + key + "', '1', 'cs_CZ', '"+CZ[key]+"');");
            //}
        }
    } else if(CSV){
        console.log("cz,,,,key");
        for(var key in CZ){
            //if(CZ[key] == text){
                
                console.log("\""+CZ[key]+"\",,,," + key);
            //}
        }
    } else {
        fs.readFile(name, function (err, data) {
            
            if (err) {
                throw err; 
            }
            //console.log(CZ);
            doclocation = location.replace(/\//gi, '.');
            if(doclocation[0] == '.'){
                doclocation = doclocation.substr(1);
            }
            
            
            console.log('doclocation', location, doclocation);
            myhtmlparser(data.toString());
    
        });
    }
    
    
  });



  
var promptText = {properties:{}};
var promptData = [];

function myhtmlparser(html){
    var parser = new htmlparser.Parser({
    onopentag: function(name, attribs){
        if(name === "script" && attribs.type === "text/javascript"){
            console.log("JS! Hooray!");
        }
    },
    ontext: function(text){
        text = text.trim();
        if(text && text.indexOf('{{') == -1 && text.length > 1) {
            
            
            
            promptText.properties[promptData.length] = {description: text};
            promptData.push(text);
            //console.log("-->", "'" + text +"'");
              
        }
        
    },
    onclosetag: function(tagname){
        if(tagname === "script"){
            console.log("That's it?!");
        }
    }
    }, {decodeEntities: true});
    parser.write(html);
    parser.end();
    textStore(html);
}

function textStore(html){
  //console.log(promptText);
  //prompt.get(promptText, function (err, result) {
    //if (err) { return onErr(err); }
    console.log('Command-line input received:');
    //console.log(result);
    
    for(var resultKey in promptData){
        var translateKey = (1+Number(resultKey));
        
        if(translateKey){
            var text = promptData[resultKey];
            
            var translateExistKey = retriveKeyIfTextAlreadyExist(text);
             console.log(doclocation, translateExistKey);
            translateKey =  translateExistKey || 'business.' + doclocation + '.' + translateKey;
             
            var helptext = text.substr(0, text.length-1) + HELPKEY + text.substr(text.length-1);
            var translateText = "{{'"+translateKey+"' | translate}} <!-- " + helptext + " -->";
           
            
            if(!translateExistKey){
                CZ[translateKey] = text;
            }
            
            
            html = html.replace(text, translateText);
        }
    }
    
    html = html.replace(new RegExp(HELPKEY, 'g'), '');
    fs.writeFile(name, html, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("test.html The file was saved!");
    }); 
    
    
    generateJSON();
    //console.log('  Email: ' + result.email);
  //});
}


function retriveKeyIfTextAlreadyExist(text){
    for(var key in CZ){
        if(CZ[key] == text){
            
            return key;
        }
    }
    
    
    
    return null;
}

function generateJSON(){
    var CZJSON = '';
    
    for(var key in CZ){
        CZJSON += ',\n\t"' + key + '" : "' + CZ[key] + '"';
    }
    
    CZJSON = '{\n' + CZJSON.substr(3) + '\n}';
    
    fs.writeFile(jsonFILE, CZJSON, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("test.html The file was saved!");
    });
}


var prompt = require('prompt');

  prompt.start();

 

  function onErr(err) {
    console.log(err);
    return 1;
  }