$ ->
	$('li').mouseover ->
		id = $(this).data('id')
		$(this).addClass('hover')
	
	$('li').mouseout ->
		id = $(this).data('id')
		$(this).removeClass('hover')
	
	$('li').click ->
		id = $(this).data('id')
		window.location = "/md/" + id
