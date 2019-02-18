import { getPath } from 'app';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
var data = null;

var dataFilePath = join(getPath('userData'), 'mtga-collection-optimizer-settings.json'); 

function load() {
  if (data !== null) {
    return;
  }
  
  if (!existsSync(dataFilePath)) {
    data = {};
    return;
  }
  
  data = JSON.parse(readFileSync(dataFilePath, 'utf-8'));
}

function save() {
  writeFileSync(dataFilePath, JSON.stringify(data));
}

export function set (key, value) {
  load();

  data[key] = value;

  save();
}

export function get (key) { 
  load();
  
  var value = null;
  if (key in data) {
    value = data[key];
  }
  
  return value;
}

export function unset (key) {
  load();
  
  if (key in data) {
    delete data[key];
    save();
  } 
}
