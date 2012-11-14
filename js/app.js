var tasks = {
  A: new Array(),
  B: new Array(),
  C: new Array(),
  D: new Array(),
};

$(document).ready(function(){
    // Display form to add a task on dblclick in a cell
  $('td').on('dblclick', function(e) {
    $('form').hide();
    $(this).find('form').toggle();
    $(this).find('form').find('input[type="text"]').focus();
    e.preventDefault();
    return false;
  });
  // Add task
  $('form').on('submit', function(e) {
    var val = $(this).find('input[type="text"]').val();
    $(this).parent().find('ul').prepend('<li>'+val+'</li>');
    $(this).toggle();
    $(this).find('input[type="text"]').val('');
    try {
      tasks[$(this).attr('id')].push(val);
    }
    catch(err) {
      console.error(err);
    }
    e.preventDefault();
    return false;
  });
  $('form').hide();
});