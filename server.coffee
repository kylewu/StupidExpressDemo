express = require('express')
routes = require('./routes')

app = module.exports = express.createServer()

# Import DB module
DB = require('./db')

#### Configuration

app.configure ->
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'jade'
	app.set 'view options', layout: false
	app.use express.bodyParser()
	app.use express.methodOverride()
	app.use app.router
	app.use express.static(__dirname + '/public')

app.configure 'development', ->
  app.use express.errorHandler(dumpExceptions: true, showStack: true)

app.configure 'production', ->
  app.use express.errorHandler()

#### Routes
#
# Index page
# Show all existing items
app.get '/', (req, res) ->
	mds = (new DB()).all()
	param = {title: 'MDP', mds: mds}
	console.log mds
	res.render 'index', param

# Create new item. Returns empty item to edit
app.get '/empty', (req, res) ->
	res.render 'md', title: 'New', mdid:-1

# Read one item by id
# only empty page will be return
# item will be sent to browser using **/get**
app.get '/md/:id', (req, res) ->
	res.render 'md', title: 'MD', mdid:req.params.id

# Update one item or create one item
app.post '/save', (req, res) ->

	id = parseInt req.body.id
	content = req.body.content
	name = req.body.name
	console.log id, content, name

	md = new DB(id, name, content)
	id = md.save()

	json = {}
	json.code = 200
	json.id = id
	res.json(json)

# Receive post request and return one item by id
app.post '/get', (req, res) ->

	id = req.body.id

	md = new DB()
	md.get(id)

	json = {}
	json.code = 200
	json.md = md
	res.json(json)

#### Start
app.listen 3000

console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env
