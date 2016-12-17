var swig  = require('swig');
var mkpath = require('mkpath');
var fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;
        
var SRC_DIR = "./src/app/";


var param_template = '--template=';
var param_force = '--force';

var template = '';
var name = null;
var location = null;
var parent = '../';
var force = false;

var done = [false, false, false, false];

process.argv.forEach(function (val, index, array) {
  if(val.startsWith(param_template)){
      template = val.substr(param_template.length)
      
      
  } else if(val.startsWith(param_force)){
      // rewrite files even they are exists
      force = true;
      
  }else if(index > 1 && !location){
      location = val;
      
      var haveDir = location.lastIndexOf('/');
      if(haveDir != -1){
          name = location.substr(haveDir+1);
          mkpath.sync(SRC_DIR + location.substr(0, haveDir));
          var count = (location.match(/\//g) || []).length;
          
          // doing '../' * count => '../../../....' for parent directory
          parent = new Array( count + 1 ).join( parent )
          console.log('parent', count, parent);
      } else {
          name = location;
      }
      
      
  } 
  console.log(index + ':location: ' + val); 
});

var destTSfile = SRC_DIR + location ;

var replacement = {
    name: name,
    selector : location.replace('/','-'),
    parent : parent,
    location : location
    };


generateFile(template + '.component.tts', destTSfile + '.component.ts', replacement, 0);
generateFile(template + '.component.html', destTSfile + '.component.html', replacement, 1);
generateFile(template + '.component.scss', destTSfile + '.component.scss', replacement, 2);

var haveDir = location.lastIndexOf('/');
var dirOnly = SRC_DIR + location.substr(0, haveDir) + '/';
var dirOnlyWithIndex = dirOnly + 'index.ts';
//console.log('dirOnlyWithIndex', dirOnlyWithIndex);
generateFile('generators/index.tts', dirOnlyWithIndex, replacement, 3);

function generateFile(src, dest, replacement, doneStep){
    if (!force && fs.existsSync(destTSfile)) {
        // Do something
        console.error('Fail: File does exist ["'+dest+'"]');
        return;
    }


    var TSrender = swig.renderFile(src, replacement);
    fs.writeFile(dest, TSrender, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log(dest + " [created]");
        showAllIsDone(doneStep)
    });
}

function showAllIsDone(doneStep){
    done[doneStep] = true;
    
    var allDone = done.some(function (d){
        return !d;
    });
    
    if(!allDone){
        



        exec("git add " + destTSfile + '.ts ' + destTSfile + '.html ' + destTSfile + '.less ' + dirOnly + 'index.ts' , puts);
        
        console.log('all done')
    }
}

function puts(error, stdout, stderr) { console.log(stdout) }