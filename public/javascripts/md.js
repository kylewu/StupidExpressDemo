$(function() {
  var converter, editor, empty, id;
  converter = Markdown.getSanitizingConverter();
  editor = new Markdown.Editor(converter);
  editor.run();
  empty = $('title').text().toLowerCase().indexOf('new') === 0;
  $('#async-success').hide();
  $('#btn-save').click(function() {
    var action, content, id, json, name;
    content = $('#wmd-input').val();
    name = $('#md-name').val();
    id = $('#md-id').text();
    action = '/save';
    json = {
      "id": id,
      "content": content,
      "name": name
    };
    $.post(action, json, function(data) {
      var new_id;
      if (data.code === 200) {
        new_id = data.id;
        $('#md-id').text(new_id);
        return $('#async-success').fadeIn("slow").delay(3000).fadeOut("slow");
      }
    });
    return false;
  });
  id = parseInt($('#md-id').text());
  if (id !== -1) {
    $.post('/get', {
      id: id
    }, function(data) {
      var content, html, name;
      if (data.code === 200) {
        content = data.md.content;
        name = data.md.name;
        html = converter.makeHtml(content);
        $('#md-name').val(name);
        return $('#wmd-input').val(content);
      }
    });
  }
});