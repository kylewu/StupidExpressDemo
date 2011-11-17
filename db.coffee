fs = require('fs')

PATH = 'data'

_get_json = ->
	fileContents = fs.readFileSync(PATH, 'utf8')
	schema = JSON.parse(fileContents)

_add_json = (name, content)->
	json = _get_json()
	json.max += 1
	json.mds[json.max] = {"name":name, "content":content}
	fs.writeFileSync(PATH, JSON.stringify(json), 'utf8')
	json.max

_update_json = (id, name, content)->
	json = _get_json()
	md = json.mds[id]
	md.name = name
	md.content = content
	fs.writeFileSync(PATH, JSON.stringify(json), 'utf8')
	id

class MD
	constructor: (@id, @name, @content) ->

	save: ->
		if @id != -1
			# Update
			console.log 'ready to update'
			_update_json(@id, @name, @content)
		else
			# Insert 
			console.log 'ready to insert'
			_add_json(@name, @content)
	
	get: (id) ->
		md = _get_json()['mds'][id]
		@name = md.name
		@content = md.content
		@
	
	all: ()->
		mds = _get_json().mds
		for k,v of mds
			{"id":k, "name": v.name, "content": v.content}

module.exports = MD
