let turn = 1; //int to track which player's turn it is - alternates between 1 and 2
let p1 = new Player(1)  //Player with id 1
let p2 = new Player(2) //Player with id 2

//makes it the next player's turn
function nextTurn() {
    if(turn == 1) {//change to p2's turn
        turn = 2;
        document.getElementById("p1-wrapper").style.display = "none";
        document.getElementById("p2-wrapper").style.display = "flex";
        window.alert("Player 2: Your Turn\n" + p1.shipsLeft + " ships remaining");
    } else {//change to p1's turn
        turn = 1;
        document.getElementById("p2-wrapper").style.display = "none";
        document.getElementById("p1-wrapper").style.display = "flex";
        window.alert("Player 1: Your Turn\n" + p2.shipsLeft + " ships remaining");
    }

    return turn
}

//checks if a player has won and executes end game
function checkWin() {
    if (p1.shipsLeft == 0) {
        //p1 wins
        setTimeout( () => window.alert("PLAYER 1 WINS!"), 2000);
    } else if (p2.shipsLeft == 0) {
        //p2 wins
        setTimeout( () => window.alert("PLAYER 2 WINS!"), 2000);
    }
}