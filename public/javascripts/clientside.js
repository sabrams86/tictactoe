$(document).ready(function() {
  var state = true,
      winner = false,
      xMoves = [],
      oMoves = [],
      wins = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

  $('.main').on('click', '.box', function(){
    //player 1
    if ($(this).children().text().length === 0){
      if (state) {
        $(this).children().text('X');
        var thisBox = $(this).attr('id');
            thisBox = parseInt(thisBox.substr(thisBox.length -1));
        xMoves.push(thisBox);
        state = false;

        wins.forEach(function(combo){
          var result = xMoves.filter(function(Move){
            return Move === combo[0] || Move === combo[1] || Move === combo[2];
            });
          if(result.length === 3){
            winner = true;
            alert("X wins!");
            state = true;
            winner = false;
            xMoves = [];
            oMoves = [];
            $('.box').children().text('');
          }
        });
        if(xMoves.length === 5 && winner === false){
          alert("Draw");
          state = true;
          winner = false;
          xMoves = [];
          oMoves = [];
          $('.box').children().text('');
        }
        //player 2
      } else {
        $(this).children().text('O');
        var thisBox = $(this).attr('id');
            thisBox = parseInt(thisBox.substr(thisBox.length -1));
        oMoves.push(thisBox);
        state = true;

        wins.forEach(function(combo){
          var result = oMoves.filter(function(Move){
            return Move === combo[0] || Move === combo[1] || Move === combo[2];
          });
          if(result.length === 3){
            alert("O wins!");
            state = true;
            winner = false;
            xMoves = [];
            oMoves = [];
            $('.box').children().text('');
          }
        })

      }
    }
  });
});
