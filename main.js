


/*=========================
     initialize game
=========================*/
var myApp = {
  // defining variables
  initializeVars: function() {
    this.count = 0; // if count = 3 it means the palyer won
    this.playerA = []; // compare to winning options
    this.playerB = []; // compare to winning options
    this.currentPlayer = this.playerA;
    this.gameBoard = // will check if square is blank if is can proceed
      [
        '', '', '', 
        '', '', '',
        '', '', ''
      ];
  },
  winCombos: // will be referenced to check if player won
    [
      ['0', '1', '2'],
      ['3', '4', '5'],
      ['6', '7', '8'],
      ['0', '3', '6'],
      ['1', '4', '7'],
      ['2', '5', '8'],
      ['0', '4', '8'],
      ['6', '4', '2']
    ],
  initializeGame: function() {
    myApp.initializeVars();
    $(document).on('click', '.clickableButton', function() { 
        myApp.value = $(this).attr('value');
        console.log('###### On click button working ######');
        console.log('value click ', myApp.value);
        myApp.navigation.playerSelectNavigation(myApp.value);
        myApp.navigation.symbolSelectNavigation(myApp.value);
        myApp.navigation.gameBoardNavigation(myApp.value);
        // myApp.game.updateBoard(myApp.value);
        // myApp.game.checkForWin();
    });
  }

};
/* initialize game */


/*=========================
      Game Logic
=========================*/
myApp.game = {
  initiateGame: function() {
    
  }


  checkForWin: function() {
    console.log('check for win func');
    for (var i = 0; i < myApp.winCombos.length; i++) { // begin loop 1
      for (var j = 0; j < myApp.winCombos[i].length; j++) { // begin loop 2
        if ( myApp.currentPlayer.indexOf(myApp.winCombos[i][j]) !== -1) {
          console.log('if statement in it');
          myApp.count++;
          console.log('count ', myApp.count);
          if ( myApp.count === 3) {
            console.log('win'); // win. return win condition
            return myApp.count;
          }
        }
      } // end loop 2
      myApp.count = 0;
    } // end loop 1
    if ( myApp.gameBoard.indexOf('') === -1 ) { // drawl. return drawl condition
      console.log('im in here yall');
    }
    this.changePlayer();
  },
  updateBoard: function(value) {
    console.log('gameBoard value ', myApp.gameBoard[value] );
    console.log('indexOf ', myApp.gameBoard.indexOf('') );
    if ( myApp.gameBoard[value] === '' ) {
      myApp.gameBoard[value] = value;
      this.updatePlayer(myApp.currentPlayer, value);
      console.log('gameBoard ', myApp.gameBoard);
    }
  },
  updatePlayer: function(playerInPlay, playerValue) {
      myApp.playerInPlay.push(playerValue);
  },
  changePlayer: function() {
    if ( myApp.currentPlayer === myApp.playerA ) {
      myApp.playerA = currentPlayer;
      myApp.currentPlayer = myApp.playerB;
    } 
    else {
      myApp.playerB = currentPlayer
      myApp.currentPlayer = myApp.playerA;
    }
    console.log('playerA', myApp.playerA);
    console.log('playerB', myApp.playerB);
  }

};
/* End Game Logic */


/*=========================
      Game navigation
=========================*/
myApp.navigation = {
  playerSelectNavigation(value) {
    if (value === 'select1Player' || value === 'select2Player') {
      document.getElementById("numberOfPlayerSelect").style.display = 'none';
      document.getElementById("signSelect").style.display = 'block';

      if (value === 'select1Player') {
        $(".numberOfPlayerHeader").text('Would you like X or O?');
        $("#currentPlayer2").text("Computer's turn");
      }
      if (value === 'select2Player') {
        $(".numberOfPlayerHeader").text('Player 1 : Would you like X or O?');
        $("#currentPlayer2").text('Go Player 2!');
      }      
    }
  },
  symbolSelectNavigation(value) {
    if (value === 'x' || value === 'o') {
      document.getElementById("signSelect").style.display = 'none';
      document.getElementById("communicationCenter").style.display = 'block';
      document.getElementById("gameBoard").style.display = 'block';
      document.getElementById("currentPlayer1").style.display = 'block';

      // game triggered
    }
    if (value === 'back') {    
      document.getElementById("signSelect").style.display = 'none';
      document.getElementById("numberOfPlayerSelect").style.display = 'block';

      // game reset
    }
  },
  gameBoardNavigation(value) {
    if (value === 'reset') {
      document.getElementById("communicationCenter").style.display = 'none';
      document.getElementById("gameBoard").style.display = 'none';
      document.getElementById("numberOfPlayerSelect").style.display = 'block';

      document.getElementById("currentPlayer1").style.display = 'none';
      document.getElementById("currentPlayer2").style.display = 'none';

      // game reset
    }
  }
};
/* End Game navigation */

$(document).ready(function() {  
  myApp.initializeGame();
});