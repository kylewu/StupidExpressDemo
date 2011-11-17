$(function() {
  $('li').mouseover(function() {
    var id;
    id = $(this).data('id');
    return $(this).addClass('hover');
  });
  $('li').mouseout(function() {
    var id;
    id = $(this).data('id');
    return $(this).removeClass('hover');
  });
  return $('li').click(function() {
    var id;
    id = $(this).data('id');
    return window.location = "/md/" + id;
  });
});