$(document).ready(function() {
  var winner = false,
    gameOver = false,
    playerMoves = [],
    computerMoves = [],
    availableMoves = [1,2,3,4,5,6,7,8,9],
    takenMoves = [],
    currentMove,
    wins = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

  $('.main').on('click', '.box', function(){
    //********************
    //*** PLAYER TURN ****
    //********************
    if ($(this).children().text().length === 0){
      $(this).children().text('X');
      var thisBox = $(this).attr('id');
      thisBox = parseInt(thisBox.substr(thisBox.length -1));
      playerMoves.push(thisBox);
      currentMove = thisBox;

      wins.forEach(function(combo){
        var result = playerMoves.filter(function(Move){
          return Move === combo[0] || Move === combo[1] || Move === combo[2];
        });
        if(result.length === 3){
          alert("Player wins!");
          winner = true;
          gameOver=true;

        }
      });
      if(playerMoves.length === 5 && winner === false){
        alert("Draw");
        winner = true;
        gameOver=true;
      }

      takenMoves = playerMoves.concat(computerMoves);
      currentMove = playerMoves[playerMoves.length -1];
      availableMoves.splice(availableMoves.indexOf(currentMove), 1);

      //********************
      //** COMPUTER  TURN **
      //********************

      /* Computer strategy

      Move Priorities:
      1. If there's a winning move, take it
      2. If there's a blocking move, take it
      3. Take any other available move since the game will draw no matter what at this point

      Starting Strategy:
      If the center is open, take it, otherwise choose a random corner.

      */

      //if it's the computer's first move
      if (availableMoves.length === 8 && gameOver === false) {
        //pick center if it's available
        if (availableMoves.indexOf(5) >= 0 ){
          $('#box5').children().text('O');
          computerMoves.push(5);
          currentMove = 5;
        //if center is not available, pick a corner
        } else {
          var startingMoves = [1,3,7,9];
          var randomStart = startingMoves[Math.floor(Math.random()*startingMoves.length)];
          $('#box'+randomStart).children().text('O');
          computerMoves.push(randomStart);
          currentMove = randomStart;
        }
      //if it's not the computer's first move
    } else if (winner === false){
        //keep playing if no one has won yet
        if(winner === false){
          //computer checks for winning move and takes it if available
          wins.forEach(function(combo){
            var result = computerMoves.filter(function(Move){
              return Move === combo[0] || Move === combo[1] || Move === combo[2];
            });
            if(result.length === 2){
              var winningMove = combo.filter(function(move){
                return move != result[0] && move != result[1];
              });
              if(availableMoves.indexOf(winningMove[0]) >= 0 ){
                $('#box'+winningMove[0]).children().text('O');
                computerMoves.push(winningMove[0]);
                currentMove = winningMove[0];
                alert("Computer wins!");
                gameOver = true;
                winner = true;
              }
            }
          })
        }
        if(winner === false){
          //computer checks for blocking move and takes it if available
          wins.forEach(function(combo){
            var result = playerMoves.filter(function(Move){
              return Move === combo[0] || Move === combo[1] || Move === combo[2];
            });
            if(result.length === 2){
              var blockingMove = combo.filter(function(move){
                return move != result[0] && move != result[1];
              });
              $('#box'+blockingMove[0]).children().text('O');
              if (computerMoves.indexOf(blockingMove[0]) < 0){
                computerMoves.push(blockingMove[0]);
              }
              currentMove = blockingMove[0];
            }
          })
        }
        if(winner === false && computerMoves.length < playerMoves.length){
          //if there are no blocking or winning moves, computer takes any remaining move
          var randomPlay = availableMoves[Math.floor(Math.random()*availableMoves.length)];
          $('#box'+randomPlay).children().text('O');
          computerMoves.push(randomPlay);
          currentMove = randomPlay;
        }

      }

      if (winner === false){
        takenMoves = playerMoves.concat(computerMoves);
        currentMove = computerMoves[computerMoves.length -1];
        availableMoves.splice(availableMoves.indexOf(currentMove), 1);
      }
      //if the game is over, reset all of the variables
      if (gameOver === true){
        winner = false;
        gameOver = false;
        playerMoves = [];
        computerMoves = [];
        availableMoves = [1,2,3,4,5,6,7,8,9];
        takenMoves = [];
        currentMove;
        $('.box').children().text('');
      }
    }//end player cannot click taken box
  });//end click listener
});//end document ready
