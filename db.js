var MD, PATH, fs, _add_json, _get_json, _update_json;
fs = require('fs');
PATH = '/home/wenbin/data';
_get_json = function() {
  var fileContents, schema;
  fileContents = fs.readFileSync(PATH, 'utf8');
  return schema = JSON.parse(fileContents);
};
_add_json = function(name, content) {
  var json;
  json = _get_json();
  json.max += 1;
  json.mds[json.max] = {
    "name": name,
    "content": content
  };
  fs.writeFileSync(PATH, JSON.stringify(json), 'utf8');
  return json.max;
};
_update_json = function(id, name, content) {
  var json, md;
  json = _get_json();
  md = json.mds[id];
  md.name = name;
  md.content = content;
  fs.writeFileSync(PATH, JSON.stringify(json), 'utf8');
  return id;
};
MD = (function() {
  function MD(id, name, content) {
    this.id = id;
    this.name = name;
    this.content = content;
  }
  MD.prototype.save = function() {
    if (this.id !== -1) {
      console.log('ready to update');
      return _update_json(this.id, this.name, this.content);
    } else {
      console.log('ready to insert');
      return _add_json(this.name, this.content);
    }
  };
  MD.prototype.get = function(id) {
    var md;
    md = _get_json()['mds'][id];
    this.name = md.name;
    this.content = md.content;
    return this;
  };
  MD.prototype.all = function() {
    var k, mds, v, _results;
    mds = _get_json().mds;
    _results = [];
    for (k in mds) {
      v = mds[k];
      _results.push({
        "id": k,
        "name": v.name,
        "content": v.content
      });
    }
    return _results;
  };
  return MD;
})();
module.exports = MD;