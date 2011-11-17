$ ->
	converter = Markdown.getSanitizingConverter()
	editor = new Markdown.Editor(converter)
	editor.run()

	empty = $('title').text().toLowerCase().indexOf('new')==0

	$('#async-success').hide()


	$('#btn-save').click ()->
		content = $('#wmd-input').val()
		name = $('#md-name').val()
		id = $('#md-id').text()

		action = '/save'

		json = {"id": id, "content": content, "name" : name}

		$.post action, json, (data)->
			if data.code == 200
				new_id = data.id
				$('#md-id').text(new_id)
				$('#async-success').fadeIn("slow").delay(3000).fadeOut("slow")
		return false

	id = parseInt $('#md-id').text()

	if id != -1
		$.post '/get', {id:id}, (data)->
			if data.code == 200
				content = data.md.content
				name = data.md.name
				html = converter.makeHtml(content)

				$('#md-name').val(name)
				$('#wmd-input').val(content)

	return
