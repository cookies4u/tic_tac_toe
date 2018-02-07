


/*=========================
     initialize game
=========================*/
var myApp = {
  // defining variables
  initializeVars: function() {
    this.count = 0; // if count = 3 it means the palyer won
    this.playerAchoice = []; // compare to winning options
    this.playerBchoice = []; // compare to winning options
    this.winningChoice = [];
    this.playerA = ['player1', 'x'];
    this.playerB = ['player2', 'o'];
    this.currentPlayer = 'player1';
    this.gameBoard = // will check if square is blank if is can proceed
      [
        '', '', '', 
        '', '', '',
        '', '', ''
      ];
  },
  winCombos: // will be referenced to check if player won
    [
      // ['0', '1', '2'],
      // ['3', '4', '5'],
      // ['6', '7', '8'],
      // ['0', '3', '6'],
      // ['1', '4', '7'],
      // ['2', '5', '8'],
      // ['0', '4', '8'],
      // ['2', '4', '6'],

      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
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

        myApp.game.gamelogic(myApp.value);

    });
  }

};
/* initialize game */


/*=========================
      Game Logic
=========================*/
myApp.game = {
  whosTurnInitialTurn: function() { // ran once enter final navigation window maybe should also run after game round
    // console.log('random ', Math.random() < 0.5); // initial player selection
    if ('random ', Math.random() < 0.5) {
      // document.getElementById("currentPlayer1").style.display = 'block'; // needs to be defined by a function
      $("#currentPlayer1").css("display", 'block');

      myApp.currentPlayer = 'player1'
      console.log(myApp.currentPlayer);
    }
    else {
      // document.getElementById("currentPlayer2").style.display = 'block'; // needs to be defined by a function
      $("#currentPlayer2").css("display", 'block');

      myApp.currentPlayer = 'player2';
      console.log(myApp.currentPlayer);

      if (myApp.playerB[0] === 'comp') {
        console.log('im in the computer logic xxxxxxxx')
        myApp.game.computerLogic(); 
      }
    }
      // on click will tigger remaining turn changes
  },
  whosTurnOnclick: function(){
    if (myApp.currentPlayer === 'player1') {
      // document.getElementById("currentPlayer2").style.display = 'block'; // needs to be defined by a function
      // document.getElementById("currentPlayer1").style.display = 'none'; // needs to be defined by a function

      $("#currentPlayer2").css("display", 'block');
      $("#currentPlayer1").css("display", 'none');

      myApp.currentPlayer = 'player2'
    }
    else {
      // document.getElementById("currentPlayer1").style.display = 'block'; // needs to be defined by a function
      // document.getElementById("currentPlayer2").style.display = 'none'; // needs to be defined by a function

      $("#currentPlayer1").css("display", 'block');
      $("#currentPlayer2").css("display", 'none');

      myApp.currentPlayer = 'player1'
    }
  },
  gamelogic: function(value) { // when button is clicked
    // console.log('xxxxxxxx this is the value ', value);
    value = parseInt(value);
    // console.log(Number.isInteger(value));
    if (Number.isInteger(value) ) {
      if (myApp.currentPlayer === 'player1') {
        // 1. when cell clicked choice saved and value in DOM set to NA
        myApp.playerAchoice.push(value);
        // document.getElementById("value" + value).value ='NA';
        $('#value' + value).attr('value', 'NA');
        $("#value" + value).text(myApp.playerA[1]); // pass in x or o
        myApp.gameBoard[value] = myApp.playerA[1];
        console.log('myApp.gameBoard[value] ', myApp.gameBoard[value]);

        // check for win
        var winVar = myApp.game.checkForWin(myApp.playerAchoice);
        var drawVar;

        // check for draw
        if (winVar !== true) {
          drawVar = myApp.game.checkForDraw(); // do not enter this code if already won  
        }

        
        // if win or draw already happend want to stop before get to this code 
        // comp will go and switch playes again. comp will be triggered when the symbol is selected 
        // *************************** //
        if ( winVar == true || drawVar == true) { // false || true 
          
        }
        else {
          // change players dont check for player if already won are got a draw
          myApp.game.whosTurnOnclick();

          if (myApp.playerB[0] === 'comp') {
            console.log('im in the computer logic')
            myApp.game.computerLogic();  
          }
        }
        
        
      }
      else if (myApp.currentPlayer === 'player2' && myApp.playerB[0] !== 'comp') { // player2 human turn
        console.log('player2 in the house')
        myApp.playerBchoice.push(value);
        // document.getElementById("value" + value).value ='NA';
        $('#value' + value).attr('value', 'NA');
        $("#value" + value).text(myApp.playerB[1]); // pass in x or o
        myApp.gameBoard[value] = myApp.playerB[1];
        console.log('myApp.gameBoard[value] ', myApp.gameBoard[value]);

        // check for win
        var winVar = myApp.game.checkForWin(myApp.playerBchoice);
        var drawVar;

        // check for draw
        if (winVar !== true) {
          drawVar = myApp.game.checkForDraw(); // do not enter this code if already won  
        }
        
        // if win or draw already happend want to stop before get to this code 
        // comp will go and switch playes again. comp will be triggered when the symbol is selected 
        // *************************** //
        if ( winVar == true || drawVar == true) { // false || true 
          
        }
        else {
          // change players dont check for player if already won are got a draw
          myApp.game.whosTurnOnclick();
        }


      }

    }
  },
  computerLogic: function() {

    myApp.game.computerSelection();

    // change players and 
    myApp.game.whosTurnOnclick();

  },
  computerSelection: function() {
    // check winning combo
    // then making sure it's not an NA on the game board
    console.log('im in computer selection');
    var winComboMatch;
    for (var i = 0; i < myApp.winCombos.length; i++) {
      for (var k = 0; k < myApp.winCombos[i].length; k++) {
        winComboMatch = myApp.winCombos[i][k];
        // console.log('winComboMatch ', winComboMatch);
        // console.log('playerA[1] ', myApp.playerA[1]);
        // console.log('playerB[1] ', myApp.playerB[1]);
        // console.log('myApp.gameBoard[winComboMatch] ', myApp.gameBoard[winComboMatch]);
        if (myApp.gameBoard[winComboMatch] === '') {
          myApp.playerBchoice.push(winComboMatch);
          // document.getElementById("value" + value).value ='NA';
          $('#value' + winComboMatch).attr('value', 'NA');
          $("#value" + winComboMatch).text(myApp.playerB[1]); // pass in x or o
          myApp.gameBoard[winComboMatch] = myApp.playerB[1];

          // console.log('myApp.gameBoard[winComboMatch] ', myApp.gameBoard[winComboMatch]);
          // console.log('myApp.gameBoard ', myApp.gameBoard);


          // check for win
          
          myApp.game.checkForWin(myApp.playerBchoice);

          // check for draw
          myApp.game.checkForDraw();

          return;

        }
      }
    }

  },

  checkForWin: function(player) { // passing in player choice which is an array
    console.log('**************** checking for win  ****************')
    // check each option if have 3 in a row
    var wincount = 0;
    for (var j = 0; j < myApp.winCombos.length; j++) {
      for (var k = 0; k < myApp.winCombos[j].length; k++) {
        // var winComboInt = parseInt(myApp.winCombos[j][k]);
        for (var i = 0; i < player.length; i++) {
          // console.log('i: ', i, ' player[i] ', player[i]);
          // console.log('j: ', j, 'k: ', k, ' myApp.winCombos[j][k] ', myApp.winCombos[j][k]);
          // console.log(player[i], ' === ', myApp.winCombos[j][k]);
          if(player[i] === myApp.winCombos[j][k] ) { // use jk to save wins
            wincount++
            if(wincount === 3) {
              myApp.winningChoice = [myApp.winCombos[j][0], myApp.winCombos[j][1], myApp.winCombos[j][2]], 
              // console.log('you win');
              myApp.game.winCondition();
              return true; // will call win function
            }
            break;
          } 
        }
      }
      wincount = 0;
    }

  },

  winCondition: function() {
    // first highlight winning cells
    for (var i = 0; i < myApp.winningChoice.length; i++) {
      // document.getElementById("value" + myApp.playerAchoice[i]).style.color = 'blue';
      $("#value" + myApp.winningChoice[i]).css("color", 'blue'); 
    }

    // update score
    var x = 0;
    if (myApp.currentPlayer === 'player1') {
      console.log('win condition');
      x = $('#score1').attr('value');
      x++;
      $('#score1').attr('value', x);
      $("#score1").text(x);
      $("#winScreen").text('Player 1 Wins!! :D');
    }
    else {
      x = $('#score2').attr('value');
      x++;
      $('#score2').attr('value', x);
      $("#score2").text(x);
      $("#winScreen").text('Player 2 Wins!! :D');
    }
    // transparent screen over game board calling out winner. timed
    // document.getElementById("winScreen").style.display = 'block';

    $("#winScreen").css("display", 'block');

    // after time screen cleared
    myApp.game.gameResult();

    
  },
  gameResult: function() {
    // after time screen cleared
    // setInterval(function(){ // repeats every 5 seconds
    setTimeout(function(){
      // document.getElementById("winScreen").style.display = 'none';

      $("#winScreen").css("display", 'none');

      $(".numberdiv").text(''); // clear
      myApp.playerAchoice = [];
      myApp.playerBchoice = [];
      $(".numberdiv").css("color", 'white');

      for (var i = 0; i < 9; i++) {
        $('#value' + i).attr('value', i);
        myApp.gameBoard[i] = '';
      }

    }, 5000);
  },

  checkForDraw: function() {
    if (myApp.playerAchoice.length + myApp.playerBchoice.length === 9) {
      $("#winScreen").text('Draw!! :D');
      $("#winScreen").css("display", 'block');
      // after time screen cleared
      myApp.game.gameResult();

      return true;
    }
  },


};
/* End Game Logic */


/*=========================
      Game navigation
=========================*/
myApp.navigation = {
  playerSelectNavigation(value) { // page 1
    if (value === 'select1Player' || value === 'select2Player') {
      // document.getElementById("numberOfPlayerSelect").style.display = 'none';
      // document.getElementById("signSelect").style.display = 'block';

      $("#numberOfPlayerSelect").css("display", 'none');
      $("#signSelect").css("display", 'block');

      if (value === 'select1Player') {
        $(".numberOfPlayerHeader").text('Would you like X or O?');
        $("#currentPlayer2").text("Computer's turn");

        // set values
        // player 2 = comp 
        myApp.playerB[0] = 'comp';
      }
      if (value === 'select2Player') {
        $(".numberOfPlayerHeader").text('Player 1 : Would you like X or O?');
        $("#currentPlayer2").text('Go Player 2!');

        // set values
        // player 2 = player 2
        myApp.playerB[0] = 'player2';

      }      
    }
  },
  symbolSelectNavigation(value) { // page 2
    if (value === 'x' || value === 'o') {
      // document.getElementById("signSelect").style.display = 'none';
      // document.getElementById("communicationCenter").style.display = 'block';
      // document.getElementById("gameBoard").style.display = 'block';

      $("#signSelect").css("display", 'none');
      $("#communicationCenter").css("display", 'block');
      $("#gameBoard").css("display", 'block');
      

      // set value
      // player1 value to letter player 2 defualt
      if (value === 'x') {
        myApp.playerB[1] = 'o'
      } 
      else {
        myApp.playerA[1] = 'o'
        myApp.playerB[1] = 'x'
      }

      // clear game board
      $(".numberdiv").text('');
      // game triggered
      myApp.game.whosTurnInitialTurn();

      // comp will go and switch playes again. comp will be triggered when the symbol is selected. 
      // *************************** //
      // if (myApp.playerB[0] === 'comp') {
      //   console.log('im in the computer logic xxxxxxxx')
      //   myApp.game.computerLogic(); 
      // }

    }
    if (value === 'back') {    
      // document.getElementById("signSelect").style.display = 'none';
      // document.getElementById("numberOfPlayerSelect").style.display = 'block';

      $("#signSelect").css("display", 'none');
      $("#numberOfPlayerSelect").css("display", 'block');

      // game reset
    }
  },
  gameBoardNavigation(value) { // page 3
    if (value === 'reset') {
      // document.getElementById("communicationCenter").style.display = 'none';
      // document.getElementById("gameBoard").style.display = 'none';
      // document.getElementById("numberOfPlayerSelect").style.display = 'block';

      $("#communicationCenter").css("display", 'none');
      $("#gameBoard").css("display", 'none');
      $("#numberOfPlayerSelect").css("display", 'block');

      // document.getElementById("currentPlayer1").style.display = 'none';
      // document.getElementById("currentPlayer2").style.display = 'none';

      $("#currentPlayer1").css("display", 'none');
      $("#currentPlayer2").css("display", 'none');

      // clear game board
      $(".numberdiv").text(''); // clear
      // game reset
      myApp.playerAchoice = [];
      myApp.playerBchoice = [];
      $(".numberdiv").css("color", 'white'); // change all document.get to this style

      for (var i = 0; i < 9; i++) {
        $('#value' + i).attr('value', i);
        myApp.gameBoard[i] = '';
      }

      // reset points 
      $('#score1').attr('value', 0);
      $("#score1").text(0);
      $('#score2').attr('value', 0);
      $("#score2").text(0);


    }
  }
};
/* End Game navigation */

$(document).ready(function() {  
  myApp.initializeGame();
});