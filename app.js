var DB, app, express, routes;
express = require('express');
routes = require('./routes');
app = module.exports = express.createServer();
DB = require('./db');
app.configure(function() {
  app.set('views', __dirname + '/views');
  return app.set('view engine', 'jade');
});
app.set('view options', {
  layout: false
});
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.configure('development', function() {
  return app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});
app.configure('production', function() {
  return app.use(express.errorHandler());
});
app.get('/', function(req, res) {
  var mds, param;
  mds = (new DB()).all();
  param = {
    title: 'MDP',
    mds: mds
  };
  console.log(mds);
  return res.render('index', param);
});
app.get('/empty', function(req, res) {
  return res.render('md', {
    title: 'New',
    mdid: -1
  });
});
app.get('/md/:id', function(req, res) {
  return res.render('md', {
    title: 'MD',
    mdid: req.params.id
  });
});
app.post('/save', function(req, res) {
  var content, id, json, md, name;
  id = parseInt(req.body.id);
  content = req.body.content;
  name = req.body.name;
  console.log(id, content, name);
  md = new DB(id, name, content);
  id = md.save();
  json = {};
  json.code = 200;
  json.id = id;
  res.json(json);
  return console.log('returned json');
});
app.post('/get', function(req, res) {
  var id, json, md;
  id = req.body.id;
  md = new DB();
  md.get(id);
  json = {};
  json.code = 200;
  json.md = md;
  return res.json(json);
});
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);