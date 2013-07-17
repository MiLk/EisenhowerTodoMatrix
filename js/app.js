$(document).ready(function(){
  // Display form to add a task on dblclick in a cell
  $('button.btn').on('click', function(e) {
    $('form').hide();
    $(this).closest('td').find('form').toggle();
    $(this).closest('td').find('form input[type="text"]').focus();
    e.preventDefault();
    return false;
  });
  // Add task
  $('form').on('submit', function(e) {
    var val = $(this).find('input[type="text"]').val();
    $li = $('<li>'+val+'</li>');
    $li.on('click', deleteTask);
    $li.prependTo($(this).parent().find('ul'));
    $(this).toggle();
    $(this).find('input[type="text"]').val('');
    e.preventDefault();
    return false;
  });
  $('form').hide();

  function deleteTask() {
    $this = $(this);
    $this.addClass('deleted');
  }
});
