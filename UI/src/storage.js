var fs = require('fs');

var data = null;

function load(path) {
  if (data !== null) {
    return;
  } 
  
  if (!fs.existsSync(path)) {
    data = {};
    return;
  }
  
  data = JSON.parse(fs.readFileSync(path, 'utf-8')); 
}

function save(path) {
  fs.writeFileSync(path, JSON.stringify(data));
  console.log('Saved to', path);
}

exports.set = function (path, key, value) {
  load(path);
  data[key] = value; 
  save(path);
}

exports.get = function (path, key) { 
  load(path);
  var value = null;
  
  if (key in data) {
    value = data[key];
  } 
  
  return value;
}

// exports.unset = function (path, key) { 
//   load(path);
  
//   if (key in data) {
//     delete data[key];
//     save(path);
//   } 
// }
