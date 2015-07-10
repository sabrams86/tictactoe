$(document).ready(function() {
  var state = true;
  $('.main').on('click', '.box', function(){
    if ($(this).text().length === 0){
      if (state) {
        $(this).text('X');
        state = false;
      } else {
        $(this).text('O');
        state = true;
      }
    }
  });
});
