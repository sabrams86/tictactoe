$(document).ready(function() {
  var state = true,
      winner = false;

  var playerMoves = [],
      computerMoves = [],
      moveList = [1,2,3,4,5,6,7,8,9];

  var wins = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

  $('.main').on('click', '.box', function(){
    if ($(this).children().text().length === 0){
      // console.log(state);
      $(this).children().text('X');
      var thisBox = $(this).attr('id');
          thisBox = parseInt(thisBox.substr(thisBox.length -1));
      playerMoves.push(thisBox);
      state = false;

      for (var i =0; i < wins.length; i++){
        var result = playerMoves.filter(function(Move){
          return Move === wins[i][0] || Move === wins[i][1] || Move === wins[i][2];
          });
        if(result.length === 3){
          winner = true;
          alert("X wins!");
          state = true;
          winner = false;
          playerMoves = [];
          computerMoves = [];
          $('.box').children().text('');
        }
      }
      if(playerMoves.length === 5 && winner === false){
        alert("Draw");
        state = true;
        winner = false;
        playerMoves = [];
        computerMoves = [];
        $('.box').children().text('');
      }

      var takenMoves = playerMoves.concat(computerMoves);
      console.log(takenMoves);
      var currentMove = takenMoves[takenMoves.length -1];
      console.log(currentMove);
      moveList.splice(moveList.indexOf(currentMove), 1);
      console.log(moveList);
      // wins.forEach(function(combo){
      //   var result = playerMoves.filter(function(Move){
      //     return Move === combo[0] || Move === combo[1] || Move === combo[2];
      //   });
      //   if(result.length === 3){
      //     alert("X wins!");
      //   }
      // })
      if (moveList.length === 8) {
        if (moveList.indexOf(5) >= 0 ){
          $('#box5').children().text('O');
          computerMoves.push(5);
        } else {
          var startingMoves = [1,3,7,9];
          var randomStart = startingMoves[Math.floor(Math.random()*startingMoves.length)];
          $('#box'+randomStart).children().text('O');
          computerMoves.push(randomStart);
        }
      }
      wins.forEach(function(combo){
        var result = computerMoves.filter(function(Move){
          return Move === combo[0] || Move === combo[1] || Move === combo[2];
        });
        if(result.length === 2){
          var winningMove = combo.filter(function(move){
            return move != result[0] || move != result[1];
          });
          console.log(winningMove);
        }
      })


      // $(this).children().text('O');
      // var thisBox = $(this).attr('id');
      //     thisBox = parseInt(thisBox.substr(thisBox.length -1));
      // computerMoves.push(thisBox);
      // state = true;
      //
      // wins.forEach(function(combo){
      //   var result = computerMoves.filter(function(Move){
      //     return Move === combo[0] || Move === combo[1] || Move === combo[2];
      //   });
      //   if(result.length === 3){
      //     alert("O wins!");
      //     state = true;
      //     winner = false;
      //     playerMoves = [];
      //     computerMoves = [];
      //     $('.box').children().text('');
      //   }
      // })
    }
  });
});
